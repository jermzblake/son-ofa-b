import { createServer } from "http"
import { Server } from "socket.io"

const httpServer = createServer()
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
})

io.use((socket, next) => {
  const username = socket.handshake.auth.username;
  if (!username) {
    return next(new Error("invalid username"));
  }
  (socket as any).username = username;
  next();
})

io.on("connection", (socket) => {
  // fetch existing users
  const users = [];
  for (let [id, socket] of io.of("/").sockets) {
    users.push({
      userID: id,
      username: (socket as any).username,
    })
  }
  socket.emit("users", users)

  // notify existing users
  socket.broadcast.emit("user connected", {
    userID: socket.id,
    username: (socket as any).username,
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
    socket.broadcast.emit("user disconnected", socket.id);
  })
})

const PORT = process.env.PORT || 3001;

httpServer.listen(PORT, () =>
  console.log(`server listening at http://localhost:${PORT}`)
)