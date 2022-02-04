import { Socket } from "socket.io"

export interface ExtendedSocket extends Socket {
  sessionId?: string
  userId?: string
  username?: string
}