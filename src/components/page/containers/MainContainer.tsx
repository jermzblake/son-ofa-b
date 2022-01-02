import { FunctionComponent, useState } from 'react'
import { Box, Link, Typography } from '@material-ui/core'
import styled from 'styled-components/macro'
import { useTheme } from 'styled-components'

const StyledWrapper = styled(Box)`

`

interface MainContainerProps {
  title: string
  children
  hideFooter?: boolean
}

export const MainContainer: FunctionComponent<MainContainerProps> = ({title, children, hideFooter}) => {
  const theme = useTheme()
  return (
    <StyledWrapper>
      {children}
    </StyledWrapper>
  )
}