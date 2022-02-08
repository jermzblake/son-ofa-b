import React, { FunctionComponent, ReactNode } from 'react'
import { Dialog, Box, Typography, Button, DialogTitle, DialogProps, DialogContent, DialogContentText, DialogActions } from '@material-ui/core'
import { useTheme } from 'styled-components'
import styled from 'styled-components/macro'
import ClearIcon from '@material-ui/icons/Clear'

const StyledDialog = styled(Dialog)`
  && {
    overflow-y: hidden;
    .MuiDialog-paper {
      border-radius: 15px;
      overflow-y: scroll;
      ::-webkit-scrollbar {
        display: none;
      }
      -ms-overflow-style: none; /* IE and Edge */
      scrollbar-width: none; /* Firefox */
    }
  }
  &.MuiDialog-paper {
    overflow-y: hidden;
  }
`

interface ConfirmModalProps extends DialogProps {
  title: string
  message?: string
  open: boolean
  onClose: () => void
  onConfirm: () => void
  showCancel?: boolean
  icon?: ReactNode
}

export const ConfirmModal: FunctionComponent<ConfirmModalProps> = ({
  title,
  message,
  open,
  onClose,
  onConfirm,
  showCancel,
  icon,
  children,
  ...props
}) => {
  const theme = useTheme()

  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  return (
    <StyledDialog 
      open={open}
      onClose={onClose}
      {...props}
    >
      <Box bgcolor={theme.colors.backgroundComplement} padding="1em 2em">
      {showCancel && (
          <Box display="flex" justifyContent="flex-end" onClick={onClose}>
            <ClearIcon />
          </Box>
        )}
        <Box display="flex" alignItems="flex-start">
        {icon ? (
            <Box marginTop="1.5em" width='6%'>
              {icon}
            </Box>
          ) : null}
          <Box>
            {title != "" &&
              <DialogTitle>
                <Box color={theme.colors.lightPrimary} width="100%">
                  <Typography variant="h6">{title}</Typography>
                </Box>
              </DialogTitle>
            }
              <DialogContent>
                <DialogContentText component="span">
                  <Box color={theme.colors.lightPrimary}>
                    <Typography variant="body1" align="justify">
                      {message}
                    </Typography>
                  </Box>
                </DialogContentText>
              </DialogContent>
              {children && <DialogContent>{children}</DialogContent>}
          </Box>
        </Box>
        <DialogActions>
          <Box
            display="flex"
            justifyContent='space-between'
            width="100%"
            padding='1em 2em'
          >
            <Box padding="0 1em" width="50%">
              <Button onClick={onClose} color="secondary" fullWidth variant="outlined">
                CANCEL
              </Button>
            </Box>
            <Box padding='0 0 0 1em' width="50%">
              {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
              <Button onClick={handleConfirm} color="primary" variant="contained" autoFocus fullWidth>
                OK
              </Button>
            </Box>
          </Box>
        </DialogActions>
      </Box>
    </StyledDialog>
  )
}