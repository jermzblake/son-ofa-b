import React, { Children, FunctionComponent } from 'react'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { ThemeProvider } from 'styled-components'
import { useMaterialUiTheme } from './useMaterialUITheme'
import { theme as styledTheme } from './useStyledComponentsTheme'

/* 
  Material-UI supports themes
  Styled-components supports themes
  We feed our Material-Ui theme into styled components theme so our components can use it
*/

export const ThemeManager: FunctionComponent = ({children}) => {
  const { theme: materialUiTheme } = useMaterialUiTheme()

  return (
    <MuiThemeProvider theme={materialUiTheme}>
      <ThemeProvider theme={{...styledTheme}}>{children}</ThemeProvider>
    </MuiThemeProvider>
  )
}