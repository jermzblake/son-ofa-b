import { FunctionComponent, useState } from 'react'
import { Box, Link, Typography } from '@material-ui/core'
import styled from 'styled-components/macro'

const StyledWrapper = styled(Box)`

`

interface MainContainerProps {
  title: string
  children
  hideFooter?: boolean
}

export const MainContainer: FunctionComponent<MainContainerProps> = ({title, children, hideFooter}) => {

  return (
    <StyledWrapper>
      {children}
    </StyledWrapper>
  )
}