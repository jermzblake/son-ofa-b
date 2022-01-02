import { createGlobalStyle } from 'styled-components/macro'
import { theme, ThemeType } from '../hooks/theme'

export { theme }

export const GlobalStyle = createGlobalStyle<{ theme: ThemeType }>`
  html, body, #root {
    box-sizing: border-box;
    height: 100%;
  }
  body {
    overflow-y: scroll;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.baseText};
    font-family: ${props => props.theme.fonts.primary};
    font-size: 15px;
    line-height: 1.4;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  h1,h2,h3,h4 {
    font-weight: normal;
    line-height: 1.27;
  }
  h1 {
    font-size: 1.625rem;
  }
  h2, h3 {
    font-size: 1.375rem;
  }
  h4 {
    font-size: 0.875rem;
  }
  p, ul, ol {
    line-height: 1.5;
    margin-bottom: 20px;
    font-size: 0.875rem;
  }
  ul {
    list-style: disc inside none;
  }
  strong {
    font-weight: bold;
  }
  a {
    text-decoration: none; /* no underline */
    cursor: pointer;
    color: inherit; // no default colors
  }
`
