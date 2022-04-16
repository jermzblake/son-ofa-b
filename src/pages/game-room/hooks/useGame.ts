import React, { useCallback, useEffect, useState } from 'react'
import socket from '../../../socket'
import { User, Game, MessageBoard, Player, PlayingCard } from 'common/types'
import { gameService } from 'utils/gameService'
import { useLocation, useParams } from 'react-router-dom'
import { useLocalStorage } from 'hooks/use-local-storage/useLocalStorage'
import { useDeck } from 'hooks/use-deck/useDeck'
import { useTurn } from 'hooks/use-turn/useTurn'

export const useGame = () => {
  const { getGame, addPlayerToGame, startBackendGame, readyPlayer, submitBid, takeTurn } = gameService()
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
  const [bidsIn, setBidsIn] = useState<boolean>(false)
  const [selectedCard, setSelectedCard] = useState<PlayingCard>()
  const { checkCardIsPlayable } = useTurn()

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
      })
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
        alert(`${game.winner} has won!!`)
      }
      if (game.enabled) {
        setShowPreGame(false)
        // @ts-ignore
        const playerIndex = game.players.findIndex(player => player.id === socket.userId)
        setBackendPlayer(game.players[playerIndex])
        if (game.players.findIndex(player => player.bid === null || undefined) < 0) {
          setBidsIn(true)
        } else {
          setBidsIn(false)
        }
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

  const submitPlayerBid = async (bid: number) => {
    const response = await submitBid(currentGame?.id, {...backendPlayer, bid: bid})
  }

  const handleCardSelect = async (card: PlayingCard) => {
      //check that this card can be played (suit match player has card with trump suit)
      // send notification if card is wrong suit
    if (currentGame?.pile?.length > 0 && !checkCardIsPlayable(backendPlayer?.hand, card, currentGame?.leadSuit)) {
      setSelectedCard(null)
      return alert('Player must play card with suit matching leading suit')
    }
    if (card.suit === selectedCard?.suit && card.value === selectedCard?.value){
      const removedCardHand = backendPlayer?.hand.filter(playerCard => playerCard.suit !== card.suit ||  playerCard.value !== card.value)
      const response = await takeTurn(currentGame?.id, {...backendPlayer, hand: removedCardHand}, selectedCard)
      if (response) {
        setSelectedCard(null)
      }
    } else {
      setSelectedCard(card)
    }

  }

  const sendMessage = (e, content) => {
    e.preventDefault()
    socket.emit('group message', {content, sender: 'need the current user id'})
    setMessages([...messages, {content, sender: 'need the current user id'}])
  }

  return {
    currentGame,
    setCurrentGame,
    backendPlayer,
    messages,
    readyUp,
    showPreGame,
    setShowPreGame,
    startGame,
    checkPlayersAreReady,
    bidsIn,
    submitPlayerBid,
    selectedCard,
    handleCardSelect
  } as const
}