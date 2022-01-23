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
  const sessionID = socket.handshake.auth.sessionID
  if (sessionID) {
    // find existing session
    const session = sessionStorage.findSession(sessionID)
    if (session) {
      socket.sessionID = sessionID
      socket.userID = session.userID
      socket.username = session.username
      return next();
    }
  }
  const username = socket.handshake.auth.username
  if (!username) {
    return next(new Error("invalid username"))
  }
  // create new session
  socket.sessionID = uuidv4();
  socket.userID = uuidv4();
  socket.username = username;
  next();
})

io.on("connection", (socket: ExtendedSocket) => {
  socket.emit("session", {
    sessionID: socket.sessionID,
    userID: socket.userID,
  })
  // fetch existing users
  const users = [];
  for (let [id, socket] of io.of("/").sockets) {
    users.push({
      userID: id,
      username: (socket as ExtendedSocket).username,
    })
  }
  io.emit("users", users)

  // notify existing users
  socket.broadcast.emit("user connected", {
    userID: socket.id,
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