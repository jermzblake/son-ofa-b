import { createServer } from "http"
import { Server } from "socket.io"
import { v4 as uuidv4 } from 'uuid'
import { ExtendedSocket } from './src/common/types'
import { useSessionStore } from './utils/useSessionStore'
import { useMessageStore } from  './utils/useMessageStore'
import express, { Application, Request, Response } from "express"
import 'dotenv/config'
import logger from 'morgan'
import path from 'path'
import favicon from 'serve-favicon'
import gameRouter from './routes/api/games.routes'

const app: Application = express()

import './config/database'

app.use(logger('dev') as any)
// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure both serve-favicon & static middlewares
// to serve from the production 'build' folder but for now serving out of public
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')) as any);
app.use(express.static(path.join(__dirname, 'build')));

// Put API routes here, before the "catch all" route


// Mount custom auth middleware to protect auth API routes below it
app.use('/api/games', gameRouter)

// The following "catch all" route (note the *)is necessary
// for a SPA's client-side routing to properly work
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const { InMemorySessionStore } = useSessionStore()
const sessionStore = new InMemorySessionStore()

const { InMemoryMessageStore } = useMessageStore()
const messageStore = new InMemoryMessageStore()

const httpServer = createServer(app)
export const io = new Server(httpServer, {
  cors: {
    origin: process.env.REACT_APP_API_URL,
  },
})

io.use((socket: ExtendedSocket, next) => {
  const sessionId = socket.handshake.auth.sessionId
  if (sessionId) {
    // find existing session
    const session = sessionStore.findSession(sessionId)
    if (session) {
      socket.sessionId = sessionId
      socket.userId = session.userId
      socket.username = session.username
      return next();
    }
  }
  const username = socket.handshake.auth.username
  if (!username) {
    return next(new Error("invalid username"))
  }
  // create new session
  socket.sessionId = uuidv4();
  socket.userId = uuidv4();
  socket.username = username;
  next();
})

io.on("connection", (socket: ExtendedSocket) => {
  // persist session
  sessionStore.saveSession(socket.sessionId, {
    userId: socket.userId,
    username: socket.username,
    connected: true,
  })

  // emit session details
  socket.emit("session", {
    sessionId: socket.sessionId,
    userId: socket.userId,
    username: socket.username
  })

  // join the "userID" room
  socket.join(socket.userId)

  // fetch existing users
  const users = []
  const messagesPerUser = new Map();
  messageStore.findMessagesForUser(socket.userId).forEach((message) => {
    const { from, to } = message;
    const otherUser = socket.userId === from ? to : from
    if (messagesPerUser.has(otherUser)) {
      messagesPerUser.get(otherUser).push(message)
    } else {
      messagesPerUser.set(otherUser, [message])
    }
  })
  sessionStore.findAllSessions().forEach((session) => {
    users.push({
      userId: session.userId,
      username: session.username,
      connected: session.connected,
      messages: messagesPerUser.get(session.userId) || [],
    });
  })
  io.emit("users", users)

  // notify existing users
  socket.broadcast.emit("user connected", {
    userId: socket.userId,
    username: socket.username,
    connected: true,
    messages: []
  })

  // forward the private message to the right recipient
  socket.on("private message", ({ content, to }) => {
    const message = {
      content,
      from: socket.userId,
      to,
    }
    socket.to(to).to(socket.userId).emit("private message", message)
    messageStore.saveMessage(message)
  })

  // forward group message to game room
  socket.on("group message", ({ content, sender, room }) => {
    const message = {
      content,
      from: sender
    }
    io.to(room).to(socket.userId).emit("group message", message)
  })

  socket.on("create new game", async ({ db_response }) => {
    io.emit("new game created", {
      ...db_response
    })
  })

  socket.on("get user", () => {
    io.to(socket.userId).emit("user", {
      userId: socket.userId,
      username: socket.username,
      connected: true,
      messages: []
    })
  })

  socket.on("player connected", ({ game }) => {
    io
        .to(socket.userId)
        .emit(
            'player joined',
           {game, user: {
            userId: socket.userId,
            username: socket.username,
            connected: true,
           }}
        )
        socket.join(game?.id)
  })

  socket.on('player reconnected', ({ game, playerIndex }) => {
    io.to(socket.userId).emit('player rejoined', { ...game.players[playerIndex] })
    socket.join(game?.id)
  })

  socket.on('player disconnect', ({ player, room }) => {
    socket.leave(room)
    io.to(room).emit('player disconnected', player)
    console.log('game', room, 'player', player)
  })

  // notify users upon disconnection
  socket.on("disconnect", async () => {
    const matchingSockets = await io.in(socket.userId).allSockets()
    const isDisconnected = matchingSockets.size === 0
    if (isDisconnected) {
      // notify other users
      socket.broadcast.emit("user disconnected", socket.userId);
      // update the connection status of the session
      sessionStore.saveSession(socket.sessionId, {
        userId: socket.userId,
        username: socket.username,
        connected: false,
        messages: []
      });
    }
  })
})

// Configure to use port 3001 instead of 3000 during
// development to avoid collision with React's dev server
const port = process.env.PORT || 3001;

httpServer.listen(port, () =>
  console.log(`Express app listening at http://localhost:${port}`)
)