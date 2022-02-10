import { createServer } from "http"
import { Server } from "socket.io"
import { v4 as uuidv4 } from 'uuid'
import { ExtendedSocket } from './src/common/types'
import { useSessionStore } from './utils/useSessionStore'
import { Game } from './src/common/types'

const { InMemorySessionStore } = useSessionStore()
const sessionStore = new InMemorySessionStore()

const httpServer = createServer()
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
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
  const users = [];
  sessionStore.findAllSessions().forEach((session) => {
    users.push({
      userId: session.userId,
      username: session.username,
      connected: session.connected,
    });
  })
  io.emit("users", users)

  // notify existing users
  socket.broadcast.emit("user connected", {
    userId: socket.userId,
    username: socket.username,
    connected: true
  })

  // forward the private message to the right recipient
  socket.on("private message", ({ content, to }) => {
    socket.to(to).to(socket.userId).emit("private message", {
      content,
      from: socket.userId,
      to,
    })
  })

  socket.on("create new game", ({ newGame }) => {
    newGame.id = uuidv4()
    newGame.players = ( socket.userId)
    newGame.creator = (socket.userId)
    socket.emit("new game created", {
      newGame
    })
    socket.join(newGame.id)
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
      });
    }
  })
})

const PORT = process.env.PORT || 3001;

httpServer.listen(PORT, () =>
  console.log(`server listening at http://localhost:${PORT}`)
)