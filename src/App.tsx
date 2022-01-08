import React from 'react';
import { ThemeProvider } from 'styled-components/macro'
import { Route, Routes } from 'react-router-dom'
import { theme, GlobalStyle } from 'styles/globalstyles'
import Home from './pages/dashboard/Home'
import Lobby from './pages/lobby/Lobby'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lobby" element={<Lobby />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
