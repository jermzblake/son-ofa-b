import React, { useState } from 'react'
import { Game } from 'common/types'
import socket from 'socket'
import { gameService } from 'utils/gameService'
import toast from 'react-hot-toast'

const newDefaultGame: Game = {
  playerCount: 3,
  rounds: 8
}

export const useCreateGame = () => {
  const [newGame, setNewGame] = useState<Game>(newDefaultGame)
  const [showCreateGame, setShowCreateGame] = useState<boolean>(false)
  const { createGame } = gameService()

  const createNewGame = async (currentUser) => {
    if(!currentUser) {
      toast.error(`Looks like we can't find your name please return to the home page. (you may need to clear your local storage)`)
      return
    }
    // handle creating new game
    newGame.creator = (currentUser?.userId)
    newGame.name = currentUser?.username + "'s"
    const db_response: Game = await createGame(newGame)
    // emit newly created game
    if (db_response) {
    socket.emit("create new game", {
      db_response,
    })
    }
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
