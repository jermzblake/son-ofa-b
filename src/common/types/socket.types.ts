import { Socket } from "socket.io"

export interface ExtendedSocket extends Socket {
  sessionID?: string
  userID?: string
  username?: string
}