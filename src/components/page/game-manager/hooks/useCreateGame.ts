import React, { useState, useEffect } from 'react'
import { Game, User} from 'common/types'
import socket from 'socket'
import { gameService } from 'utils/gameService'

const newDefaultGame: Game = {
  playerCount: 3,
  rounds: 8
}

export const useCreateGame = () => {
  const [newGame, setNewGame] = useState<Game>(newDefaultGame)
  const [showCreateGame, setShowCreateGame] = useState<boolean>(false)
  const { createGame } = gameService()

  useEffect(() => {
  }, [])

  const createNewGame = async () => {
    // handle creating new game
    const db_response: Game = await createGame(newGame)
    // emit newly created game
    if (db_response) {
    socket.emit("create new game", {
      db_response,
    })
    }
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
