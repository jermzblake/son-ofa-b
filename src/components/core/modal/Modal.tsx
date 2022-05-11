import React, { FunctionComponent } from 'react'
import { Dialog, Box, Typography } from '@material-ui/core'
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

const TitleBox = styled(Box)`
  && {
    display: flex;
    margin: 0.5em 0.5em;
    padding-bottom: 0.8em;
    border-bottom: 1px solid ${props => props.theme.colors.border};
  }
`

const ModalContent = styled(Box)`
  width: auto;
  height: auto;
  padding: 0 1.5em 1.5em 1.5em;
  background-color: ${props => props.theme.colors.backgroundComplement};
`

interface ModalProps {
  show: boolean
  onClose?: Function
  title: string
  showCancel?: boolean
  dialogWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false
}

export const Modal: FunctionComponent<ModalProps> = ({ show, onClose, title, showCancel, dialogWidth, children }) => {
  const theme = useTheme()

  return (
    <StyledDialog open={show} onClose={() => onClose ? onClose() : null} maxWidth={dialogWidth}>
      <Box bgcolor={theme.colors.backgroundComplement} color={theme.colors.darkText}>
        <TitleBox>
          <Box display="flex" marginLeft="auto">
            <Typography component="span" variant="h6">
              <Box color={theme.colors.lightPrimary} fontWeight="bold">
                {title}
              </Box>
            </Typography>
          </Box>
          <Box display="flex" flexDirection="row-reverse" flexGrow={1} onClick={() => onClose()}>
            {showCancel && <ClearIcon />}
          </Box>
        </TitleBox>
        <ModalContent>{children}</ModalContent>
      </Box>
    </StyledDialog>
  )
}
