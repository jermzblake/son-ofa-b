import { useMemo } from 'react'
import { createTheme } from '@material-ui/core/styles'
import { materialUiTheme as materialUiThemeJson } from './materialUITheme'

export const useMaterialUiTheme = () => {
  const { result } = materialUiThemeJson()

  const theme = useMemo(() => {
    return createTheme(result())
  }, [])

  return {
    theme
  }
}