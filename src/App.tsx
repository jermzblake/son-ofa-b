import React from 'react'
import { ThemeProvider } from 'styled-components/macro'
import { Route, Routes } from 'react-router-dom'
import { theme, GlobalStyle } from 'styles/globalstyles'
import { ThemeManager } from 'hooks/theme'
import Home from './pages/dashboard/Home'
import Lobby from './pages/lobby/Lobby'
import GameRoom from './pages/game-room/GameRoom'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ThemeManager>
        <Toaster />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lobby" element={<Lobby />} />
          <Route path="/game/:gameId" element={<GameRoom />} />
        </Routes>
      </ThemeManager>
    </ThemeProvider>
  )
}

export default App
