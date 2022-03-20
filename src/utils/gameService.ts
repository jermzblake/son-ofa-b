import { Game, Player } from 'common/types'
import axios from 'axios'

const { REACT_APP_API_URL } = process.env

export const gameService = () => {
  const BASE_URL = '/api/games'

  const api = axios.create({
    baseURL: BASE_URL,
    headers: {'Content-Type': 'application/json'}
  })


  const createGame = async (newGame: Game) => {
    const data = await api.post('/', newGame).then(res => {
      return res.data
    })
    return data
  }

  const getGame = async (gameId: string) => {
    const data = await api.get(`/${gameId}`).then(res => {
      return res.data
    })
    return data
  }

  const updateGame = async (gameId: string, game: Game) => {
    const data = await api.put(`/${gameId}`).then(res => {
      return res.data
    })
    return data
  }

  const addPlayerToGame = async (gameId: string, player: Player) => {
    const data = await api.put(`/${gameId}/user/${player.id}`, player).then(res => {
      return res.data
    })
    return data
  }

  const startBackendGame = async (gameId: string, game: Game) => {
    const data = await api.put(`/${gameId}/start`, game).then(res => res.data)
    return data
  }

  const readyPlayer =  async (gameId: string, player: Player) => {
    const data = await api.put(`/${gameId}/player/ready`, player).then(res => res.data)
    return data
  }

  return {
    createGame,
    getGame,
    updateGame,
    addPlayerToGame,
    startBackendGame, 
    readyPlayer
  } as const
}