import React, { useEffect, useState } from 'react'
import socket from '../../../socket'
import { User } from 'common/types'
import { useNavigate } from 'react-router-dom'

export const useLobby = () => {
  const navigate = useNavigate()
  const [users, setUsers] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState<User>()

  useEffect(() => {
    socket.on("connect", () => {
      users.forEach((user) => {
        if (user) {
          user.connected = true;
        }
      })
    })

    socket.on("disconnect", () => {
      users.forEach((user) => {
        if (user) {
          user.connected = false;
        }
      })
    })

    const initReactiveProperties = (user: User) => {
      user.connected = true;
      user.messages = [];
      user.hasNewMessages = false;
    }

    socket.on("users", (users) => {
      users.forEach((user) => {
        user = user.userID === socket.id
        initReactiveProperties(user)
      })
      // put the current user first, and sort by username
      users = users.sort((a, b) => {
        if (a) return -1
        if (b) return 1
        if (a.username < b.username) return -1
        return a.username > b.username ? 1 : 0
      })
    })

    socket.on("user connected", (user: User) => {
      initReactiveProperties(user)
      users.push(user)
    })

    socket.on("user disconnected", (id) => {
      for (let i = 0; i < users.length; i++) {
        const user = users[i];
        if (user.userID === id) {
          user.connected = false;
          break;
        }
      }
    })

    socket.on("private message", ({ content, from }) => {
      for (let i = 0; i < users.length; i++) {
        const user: User = users[i]
        if (user.userID === from) {
          user.messages.push({
            content,
            fromSelf: false,
          });
          if (user !== selectedUser) {
            user.hasNewMessages = true
          }
          break
        }
      }
    })

    return () => {
      socket.off("connect")
      socket.off("disconnect")
      socket.off("users")
      socket.off("user connected")
      socket.off("user disconnected")
      socket.off("private message")
    }
  })

  const sendMessage = (content) => {
    if (selectedUser) {
      socket.emit("private message", {
        content,
        to: selectedUser.userID,
      });
      selectedUser.messages.push({
        content,
        fromSelf: true,
      })
    }
  }
   const selectUser = (user: User) => {
    setSelectedUser(user)
    user.hasNewMessages = false
  }

  return {
    sendMessage,
    selectUser
  } as const
}