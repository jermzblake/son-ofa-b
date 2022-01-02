import 'styled-components'

interface ThemeColours {
  primary: string
  lightPrimary: string
  secondary: string
  third: string
  border: string
  background: string
}

declare module 'styled-components' {
  export interface DefaultTheme {
      colors: ThemeColours
      fonts: {
          primary: string
          secondary: string
      }
      vars: object
      breakpoints: {
          small: string
          medium: string
          large: string
          xlarge: string
      }
  }
}