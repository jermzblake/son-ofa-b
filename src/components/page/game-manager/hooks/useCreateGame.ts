import React, { useState, useEffect } from 'react'
import { Game, User} from 'common/types'
import socket from 'socket'

const newDefaultGame: Game = {
  playerCount: 3,
  rounds: 8
}

export const useCreateGame = () => {
  const [newGame, setNewGame] = useState<Game>(newDefaultGame)
  const [showCreateGame, setShowCreateGame] = useState<boolean>(false)

  useEffect(() => {
  }, [])

  const createNewGame = async () => {
    // handle creating new game
    socket.emit("create new game", {
      newGame,
    })
    // add creating user to game? game owner?
    // push player to new game room/page
    setNewGame(newDefaultGame)
  }

  const handleSelect = (event: React.ChangeEvent<{ value: unknown }>, id: string) => {
    if (id === 'round-select') {
      setNewGame({...newGame, rounds: event.target.value as number})
    } else if (id === 'player-count-select') {
      setNewGame({...newGame, playerCount: event.target.value as number})
    }
  }

  return {
    newGame,
    setNewGame,
    createNewGame,
    handleSelect,
    showCreateGame,
    setShowCreateGame
  } as const
}
