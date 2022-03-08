import React, { useCallback, useEffect, useState } from 'react'
import socket from '../../../socket'
import { User, Game, MessageBoard } from 'common/types'
import { gameService } from 'utils/gameService'
import { useLocation, useParams } from 'react-router-dom'
import { useLocalStorage } from 'hooks/use-local-storage/useLocalStorage'

export const useGame = () => {
  const { getGame, updateGame, addPlayerToGame } = gameService()
  const { gameId } = useParams<{ gameId: string }>()
  const { getItem, setItem } = useLocalStorage()
  const [currentGame, setCurrentGame] = useState<Game>(undefined)
  const [users, setUsers] = useState<User[]>([])
  const [messages, setMessages] = useState<MessageBoard[]>([])
    // @ts-ignore
  const forceUpdate = useCallback(() => updateState({}), [])
  const [backendUser, setBackendUser] = useState<User>()

  const getData = async() => {
    const game: Game = await getGame(gameId)
    if (game) {
      setCurrentGame(game)
      socket.emit('player connected', {game})
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

    const initReactiveProperties = (user: User) => {
      user.connected = true;
      user.messages = [];
      user.hasNewMessages = false;
    }
  
    socket.on("user connected", (user: User) => {
      initReactiveProperties(user)
      users.push(user)
      setUsers(users)
    })

    socket.on("player ready", async (game) => {
      const updatedGame = await addPlayerToGame(game.game.id, game.user.userId)
      if (updatedGame) {
        setCurrentGame(updatedGame)
        setBackendUser(game.user.userId)
      }
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
    getData() 

    return () => {
      socket.off("connect")
      socket.off("disconnect")
      socket.off("users")
      socket.off("user connected")
      socket.off("user disconnected")
      socket.off("private message")
      socket.off("player ready")
    }
  }, [])

  const sendMessage = (e, content) => {
    e.preventDefault()
    socket.emit('group message', {content, sender: 'need the current user id'})
    setMessages([...messages, {content, sender: 'need the current user id'}])
  }

  return { currentGame, setCurrentGame, users, messages } as const
}