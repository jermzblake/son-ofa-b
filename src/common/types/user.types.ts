export interface User {
  userId: string
  username: string
  connected: boolean
  messages: Message[]
  hasNewMessages: boolean
}

export interface Message {
  content: any
  fromSelf: boolean
}