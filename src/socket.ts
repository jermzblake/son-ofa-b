import { io } from "socket.io-client"

const URL = process.env.SERVER_URL || "http://localhost:3001"
const socket = io(URL, { autoConnect: false }) //autoConnect is set to false so the connection is not established right away. We will manually call socket.connect() later, once the user has selected a username

socket.onAny((event, ...args) => {
  console.log(event, args);
})

export default socket