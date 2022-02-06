import { useMemo } from 'react'
import { ThemeOptions } from '@material-ui/core/styles/createTheme'
import { theme } from './useStyledComponentsTheme'

export const materialUiTheme = () => {
  const result = useMemo(
    () => (): ThemeOptions => {
      return {
        palette: {
          primary: {
            main: theme.colors.primary // '#000814'
          },
          secondary: {
            main: theme.colors.secondary // '#FFC300'
          }
        },
        // setting the font across all components
        typography: {
          fontFamily: theme.fonts.primary //'Monaco'
        },
        // this section is where we get to the bare metal of customization of material-ui
        overrides: {
          MuiDialog: {
            paper: {
              overflowY: 'hidden',
              zoom: '80%'
            }
          },
          MuiInputBase: {
            root: {
              borderColor: theme.colors.lightPrimary,
              color: theme.colors.lightPrimary,
              border: `1px solid ${theme.colors.lightPrimary}`,
              borderRadius: '6px'
            }
          },
          MuiButton: {
            // Medium
            root: {
              textTransform: 'none',
              borderRadius: '1em',
              padding: '11px 16px',
              height: '40px',
              fontSize: '14px',
              fontStyle: 'normal',
              fontWeight: 500,
              lineHeight: '16px'
            },
            text: {
              padding: '11px 16px'
            },
            outlined: {
              padding: '10px 15px'
            },
            outlinedPrimary: {
              border: '2px solid'
            },
            outlinedSecondary: {
              border: '2px solid'
            },
            // Large
            containedSizeLarge: {
              padding: '12px 21px'
            },
            outlinedSizeLarge: {
              padding: '11px 20px'
            },
            textSizeLarge: {
              padding: '12px 21px'
            },
            // Small
            outlinedSizeSmall: {
              padding: '3px 9px'
            },
            textSizeSmall: {
              padding: '4px 10px'
            },

            contained: {
              boxShadow: 'none'
            },
            containedSecondary: {
              color: theme.colors.secondary,
              backgroundColor: theme.colors.darkText,
              border: `1px solid ${theme.colors.border}`
            },
            containedPrimary: {
              color: theme.colors.darkText,
              backgroundColor: theme.colors.primary
            }
          }
        }
      }
    },
    [theme]
  )
  return {
    result
  }
}
