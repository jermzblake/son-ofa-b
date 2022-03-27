import React, { useCallback, useEffect, useState } from 'react'
import socket from '../../../socket'
import { User, Game, MessageBoard, Player } from 'common/types'
import { gameService } from 'utils/gameService'
import { useLocation, useParams } from 'react-router-dom'
import { useLocalStorage } from 'hooks/use-local-storage/useLocalStorage'
import { useDeck } from 'hooks/use-deck/useDeck'

export const useGame = () => {
  const { getGame, updateGame, addPlayerToGame, startBackendGame, readyPlayer } = gameService()
  const { gameId } = useParams<{ gameId: string }>()
  const { getItem, setItem } = useLocalStorage()
  const [currentGame, setCurrentGame] = useState<Game>(undefined)
  const [users, setUsers] = useState<User[]>([])
  const [messages, setMessages] = useState<MessageBoard[]>([])
  const [, updateState] = useState()
    // @ts-ignore
  const forceUpdate = useCallback(() => updateState({}), [])
  const [backendPlayer, setBackendPlayer] = useState<Player>()
  const { shuffle, getDeck } = useDeck()
  const [showPreGame, setShowPreGame] = useState<boolean>(true)

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

    socket.on("player joined", async (game) => {
      const updatedGame = await addPlayerToGame(game.game.id,{
        id: game.user.userId,
        gamertag: game.user.username,
        hand: [],
        bid: null,
        tricks: 0,
        totalPoints: 0,
        ready: false,
        dealer: false,
        turn: false
      }) //this player object seems to work  but not below??
      if (updatedGame) {
        setCurrentGame(updatedGame)
        setBackendPlayer({
          id: game.user.userId,
          gamertag: game.user.username,
          hand: [],
          bid: null,
          tricks: 0,
          totalPoints: 0,
          ready: false,
          dealer: false,
          turn: false
        })
      }
    })

    socket.on("game updated", (game) => {
      if (game.winner){
        // do winner work
      }
      if (game.enabled) {
        setShowPreGame(false)
        // @ts-ignore
        const playerIndex = game.players.findIndex(player => player.id === socket.userId)
        setBackendPlayer(game.players[playerIndex])
      }
      setCurrentGame(game)
      forceUpdate()
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
      socket.off("player joined")
      socket.off("game updated")
    }
  }, [])

  const startGame = async () => {
    //creator will be able to start game when all players are ready
    const newDeck = (shuffle(getDeck()))
    await startBackendGame(currentGame?.id, {...currentGame, deck: newDeck, enabled: true})
  }

  const readyUp = async () => {
    const response = await readyPlayer(currentGame?.id, {...backendPlayer, ready: true})
  }

  const checkPlayersAreReady = () => {
    let howManyReady = 0
    currentGame?.players?.forEach(player => {
      if (player.ready) howManyReady++ 
    })
    return howManyReady === currentGame?.playerCount
  }

  const sendMessage = (e, content) => {
    e.preventDefault()
    socket.emit('group message', {content, sender: 'need the current user id'})
    setMessages([...messages, {content, sender: 'need the current user id'}])
  }

  return { currentGame, setCurrentGame, backendPlayer, messages, readyUp, showPreGame, setShowPreGame, startGame, checkPlayersAreReady } as const
}