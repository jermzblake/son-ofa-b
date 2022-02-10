export const theme = {
  colors: {
    primary: '#000814',
    lightPrimary: '#FFD60A',
    secondary: '#FFC300',
    third: '#00b4d8',
    background: '#003566',
    backgroundComplement: 'white',
    border: '#001D3D',
    baseText: '#DADBDD',
    darkText: '#343D4B',
    lightText: '#979797',
  },
  fonts: {
    primary: 'Monaco',
    secondary: 'serif'
  },
  vars: {},
  breakpoints: {
    small: '360px',
    medium: '720px',
    large: '1080px',
    xlarge: '1440px'
  }
}

export type ThemeType = typeof theme