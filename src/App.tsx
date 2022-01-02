import React from 'react';
import { ThemeProvider } from 'styled-components/macro'
import { Route, Routes } from 'react-router-dom'
import { theme, GlobalStyle } from 'styles/globalstyles'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
      <Routes>
        
      </Routes>
    </ThemeProvider>
  );
}

export default App;
