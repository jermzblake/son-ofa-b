import React, { FunctionComponent } from 'react'
import { Box } from '@material-ui/core'
import styled from 'styled-components'

const StyledIcon = styled(Box)`
 && {
  height: 8px;
  width: 8px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 0.5em;
 }
`

interface StatusIconProps {
  connected: boolean
}

export const StatusIcon: FunctionComponent<StatusIconProps> = ({ connected }) => {
  return (
    <StyledIcon style={{backgroundColor: connected ? '#86bb71' : '#e38968'}} />
  )
}