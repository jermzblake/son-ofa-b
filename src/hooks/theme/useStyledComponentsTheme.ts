export const theme = {
  colors: {
    primary: '#284b63',
    lightPrimary: '#ffffff',
    secondary: '#FFC300',
    third: '#00b4d8',
    background: '#3c6e71',
    backgroundComplement: '#d9d9d9',
    backgroundComplementII: '#000814',
    border: '#001D3D',
    baseText: '#DADBDD',
    darkText: '#343D4B',
    lightText: '#979797',
    base: '#353535'
  },
  fonts: {
    primary: 'Monaco',
    secondary: 'serif'
  },
  vars: {},
  breakpoints: {
    small: '360px',
    medium: '768px',  // tablet
    large: '1024px', // laptop
    xlarge: '1440px', // large laptop
    xxlarge: '2560px' //desktop
  }
}

export type ThemeType = typeof theme