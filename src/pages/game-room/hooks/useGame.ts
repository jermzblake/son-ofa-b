import React, { useCallback, useEffect, useState } from 'react'
import socket from '../../../socket'
import { User, Game, MessageBoard, Player, PlayingCard } from 'common/types'
import { gameService } from 'utils/gameService'
import { useNavigate, useParams } from 'react-router-dom'
import { useLocalStorage } from 'hooks/use-local-storage/useLocalStorage'
import { useDeck } from 'hooks/use-deck/useDeck'
import { useTurn } from 'hooks/use-turn/useTurn'
import toast from 'react-hot-toast'

export const useGame = () => {
  const { getGame, addPlayerToGame, startBackendGame, readyPlayer, submitBid, takeTurn, takeDealerTurn } = gameService()
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
  const [showChat, setShowChat] = useState(false)
  const navigate = useNavigate()

  const getData = async () => {
    try {
      const game: Game = await getGame(gameId)
      if (game) {
        setCurrentGame(game)
        if (game.enabled) {
          setShowPreGame(false)
          const playerIndex = game.players?.findIndex(player => player.id === (socket as any).userId)
          if (playerIndex > -1) {
            setBackendPlayer(game.players[playerIndex])
            socket.emit('player reconnected', { game, playerIndex })
          }
          if (game.players.findIndex(player => player.bid === null || undefined) < 0) {
            setBidsIn(true)
          } else {
            setBidsIn(false)
          }
        } else {
          socket.emit('player connected', { game })
        }
      } else {
        navigate('*')
      }
    } catch (error) {
      if (error.message.includes('40')) navigate('*')
    }
  }

  useEffect(() => {
    const sessionId = getItem('sessionId')

    if (sessionId) {
      socket.auth = { sessionId }
      socket.connect()
    }

    socket.on('session', ({ sessionId, userId }) => {
      // attach the session ID to the next reconnection attempts
      socket.auth = { sessionId }
      // store it in the localStorage
      setItem('sessionId', sessionId)
      // save the ID of the user
      ;(socket as any).userId = userId
    })

    socket.on('connect', () => {
      users.forEach(user => {
        if (user) {
          user.connected = true
        }
      })
    })

    socket.on('disconnect', () => {
      users.forEach(user => {
        if (user) {
          user.connected = false
        }
      })
    })

    const initReactiveProperties = (user: User) => {
      user.connected = true
      user.messages = []
      user.hasNewMessages = false
    }

    socket.on('user connected', (user: User) => {
      initReactiveProperties(user)
      users.push(user)
      setUsers(users)
    })

    socket.on('player joined', async game => {
      const updatedGame = await addPlayerToGame(game.game.id, {
        id: game.user.userId,
        gamertag: game.user.username,
        hand: [],
        bid: null,
        tricks: 0,
        totalPoints: 0,
        ready: false,
        dealer: false,
        turn: false,
        roundHistory: new Array(game.rounds)
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
          turn: false,
          roundHistory: new Array(game.rounds)
        })
      }
    })

    socket.on('player rejoined', player => {
      setBackendPlayer(player)
      forceUpdate()
    })

    socket.on('game updated', game => {
      if (game.winner) {
        // do winner work
        toast(`${game.winner} has won!!`, { duration: 8000, icon: '🔥' })
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
        if (game.pile.length === game.playerCount) {
          setCurrentGame(game)
          forceUpdate()
          if (game.players[playerIndex].dealer) {
            setTimeout(async () => {
              await takeTurn(game.id, game.players[playerIndex], game.pile.pop().card)
            }, 2000)
          }
          return
        }
      }
      setCurrentGame(game)
      forceUpdate()
    })

    socket.on('group message', message => {
      messages.push({ content: message.content, sender: message.from })
      setMessages([...messages])
    })

    socket.on('user disconnected', id => {
      for (let i = 0; i < users.length; i++) {
        const user = users[i]

        if (user.userId === id) {
          user.connected = false
          forceUpdate()
          break
        }
      }
    })
    getData()

    return () => {
      socket.off('connect')
      socket.off('disconnect')
      socket.off('users')
      socket.off('user connected')
      socket.off('user disconnected')
      socket.off('group message')
      socket.off('player joined')
      socket.off('game updated')
      socket.off('player rejoined')
    }
  }, [])

  const startGame = async () => {
    const newDeck = shuffle(getDeck())
    await startBackendGame(currentGame?.id, { ...currentGame, deck: newDeck, enabled: true })
  }

  const readyUp = async () => {
    const response = await readyPlayer(currentGame?.id, { ...backendPlayer, ready: true })
  }

  const checkPlayersAreReady = () => {
    let howManyReady = 0
    currentGame?.players?.forEach(player => {
      if (player.ready) howManyReady++
    })
    return howManyReady === currentGame?.playerCount
  }

  const submitPlayerBid = async (bid: number) => {
    const response = await submitBid(currentGame?.id, { ...backendPlayer, bid: bid })
  }

  const handleCardSelect = async (card: PlayingCard) => {
    // check that this card can be played (suit match player has card with trump suit)
    // send notification if card is wrong suit
    if (currentGame?.pile?.length > 0 && !checkCardIsPlayable(backendPlayer?.hand, card, currentGame?.leadSuit)) {
      setSelectedCard(null)
      return toast.error('Player must play card with suit matching leading suit')
    }
    if (card.suit === selectedCard?.suit && card.value === selectedCard?.value) {
      const removedCardHand = backendPlayer?.hand.filter(
        playerCard => playerCard.suit !== card.suit || playerCard.value !== card.value
      )
      const response = backendPlayer?.dealer
        ? await takeDealerTurn(currentGame?.id, { ...backendPlayer, hand: removedCardHand }, selectedCard)
        : await takeTurn(currentGame?.id, { ...backendPlayer, hand: removedCardHand }, selectedCard)
      if (response) {
        setSelectedCard(null)
      }
    } else {
      setSelectedCard(card)
    }
  }

  const sendMessage = (e, content) => {
    e.preventDefault()
    socket.emit('group message', { content, sender: backendPlayer?.gamertag, room: currentGame?.id })
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
    handleCardSelect,
    sendMessage,
    showChat,
    setShowChat
  } as const
}
