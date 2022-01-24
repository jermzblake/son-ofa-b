import { createServer } from "http"
import { Server } from "socket.io"
import { v4 as uuidv4 } from 'uuid'
import { ExtendedSocket } from './src/common/types'

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
    const session = sessionStorage.findSession(sessionId)
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
  socket.emit("session", {
    sessionId: socket.sessionId,
    userId: socket.userId,
  })
  // fetch existing users
  const users = [];
  for (let [id, socket] of io.of("/").sockets) {
    users.push({
      userId: id,
      username: (socket as ExtendedSocket).username,
    })
  }
  io.emit("users", users)

  // notify existing users
  socket.broadcast.emit("user connected", {
    userId: socket.id,
    username: socket.username,
  })

  // forward the private message to the right recipient
  socket.on("private message", ({ content, to }) => {
    socket.to(to).emit("private message", {
      content,
      from: socket.id,
    })
  })

  // notify users upon disconnection
  socket.on("disconnect", () => {
    setTimeout(() => {
      socket.broadcast.emit("user disconnected", socket.id)
    }, 1000) // TODO change this to 10000 in production
    
  })
})

const PORT = process.env.PORT || 3001;

httpServer.listen(PORT, () =>
  console.log(`server listening at http://localhost:${PORT}`)
)