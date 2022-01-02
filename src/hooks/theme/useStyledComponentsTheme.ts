export const theme = {
  colors: {
    primary: '#000814',
    lightPrimary: '#FFD60A',
    secondary: '#FFC300',
    third: '#00b4d8',
    background: '#003566',
    border: '#001D3D',
    baseText: '#343D4B',
    darkText: '#979797',
    lightText: '#343D4B',
  },
  fonts: {
    primary: '',
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