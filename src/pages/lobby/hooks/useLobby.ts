import React, { useCallback, useEffect, useState } from 'react'
import socket from '../../../socket'
import { User, Game } from 'common/types'
import { useLocalStorage } from 'hooks/use-local-storage/useLocalStorage'
import { gameService } from 'utils/gameService'

export const useLobby = () => {
  const [users, setUsers] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState<User>()
  const [, updateState] = useState();
  // @ts-ignore
  const forceUpdate = useCallback(() => updateState({}), [])
  const { getItem, setItem } = useLocalStorage()
  const [currentGames, setCurrentGames] = useState<Game[]>([])
  const [showCreateGame, setShowCreateGame] = useState<boolean>(false)
  const [backendUser, setBackendUser] = useState<User>()
  const { getNewGames } = gameService()
  const [showInstructions, setShowInstructions] = useState<boolean>(false)

  const getUser = () => {
    socket.emit("get user")
  }

  const getOpenGames = async () => {
    const games: Game[] = await getNewGames()
    if (games && games.length > 0) {
      setCurrentGames(games)
    }
  }

  useEffect(() => {
    const sessionId = getItem("sessionId")

    if (sessionId) {
      socket.auth = { sessionId }
      socket.connect()
    }

    socket.on("session", ({ sessionId, userId }) => {
      // attach the session ID to the next reconnection attempts
      socket.auth = { sessionId }
      // store it in the localStorage
      setItem("sessionId", sessionId);
      // save the ID of the user
      (socket as any).userId = userId
    })

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

    if (!backendUser) getUser()

    const initReactiveProperties = (user: User) => {
      user.connected = true;
      user.messages = [];
      user.hasNewMessages = false;
    }

    getOpenGames()

    socket.on("users", (users) => {
      users.forEach((user) => {
        user.messages.forEach((message) => {
          // @ts-ignore
          message.fromSelf = message.from === socket.userId;
        })
        for (let i = 0; i < users.length; i++) {
          const existingUser = users[i];
          if (existingUser.userID === user.userId) {
            existingUser.connected = user.connected
            existingUser.messages = user.messages
            return;
          }
        }
        // @ts-ignore
        user.self = user.userId === socket.userId
        initReactiveProperties(user)
      })
      // put the current user first, and sort by username
      users = users.sort((a, b) => {
        if (a.self) return -1
        if (b.self) return 1
        if (a.username < b.username) return -1
        return a.username > b.username ? 1 : 0
      })
      setUsers(users)
    })

    socket.on("user connected", (user: User) => {
      initReactiveProperties(user)
      users.push(user)
      setUsers(users)
    })

    socket.on('user', (user) => {
      setBackendUser(user)
    })

    socket.on("user disconnected", (id) => {
      for (let i = 0; i < users.length; i++) {
        const user = users[i];

        if (user.userId === id) {
          user.connected = false;
          forceUpdate()
          break;
        }
      }
    })

    socket.on("private message", ({ content, from, to }) => {
      for (let i = 0; i < users.length; i++) {
        const user: User = users[i]
        // @ts-ignore
        const fromSelf = socket.userId === from
        if (user.userId === (fromSelf ? to : from)) {
          user.messages.push({
            content,
            fromSelf,
          });
          if (user !== selectedUser) {
            user.hasNewMessages = true
          }
          forceUpdate()
          break
        }
      }
    })

    socket.on("new game created", (newlyCreatedGame: Game) => {
      setCurrentGames(currentGames => [newlyCreatedGame, ...currentGames ])
    })

    return () => {
      socket.off("connect")
      socket.off("disconnect")
      socket.off("users")
      socket.off("user connected")
      socket.off("user disconnected")
      socket.off("private message")
      socket.off("new game created")
      socket.off("user")
    }
  }, [users, selectedUser])

  const sendMessage = (e, content) => {
    e.preventDefault()
    if (selectedUser) {
      socket.emit("private message", {
        content,
        to: selectedUser.userId,
      });
      selectedUser.messages.push({
        content,
        fromSelf: true,
      })
    }
  }

   const selectUser = (user: User) => {
     //@ts-ignore
     if (user.self) return
    setSelectedUser(user)
    user.hasNewMessages = false
  }

  return {
    sendMessage,
    selectUser,
    users,
    selectedUser,
    currentGames,
    setCurrentGames,
    showCreateGame,
    setShowCreateGame,
    backendUser,
    showInstructions, 
    setShowInstructions
  } as const
}