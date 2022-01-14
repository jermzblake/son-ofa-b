import { FunctionComponent, useEffect, useState } from 'react'
import { Box, Link, Typography } from '@material-ui/core'
import styled from 'styled-components/macro'
import { useTheme } from 'styled-components'

const StyledWrapper = styled(Box)`
  && {
    display: flex;
    padding: 1em;
  }
`

interface MainContainerProps {
  title: string
  children
  hideFooter?: boolean
}

export const MainContainer: FunctionComponent<MainContainerProps> = ({title, children, hideFooter}) => {
  const theme = useTheme()

  useEffect(() => {
    document.title = `${title} | Son Ofa B`
  }, [title])

  return (
    <StyledWrapper>
      {children}
    </StyledWrapper>
  )
}