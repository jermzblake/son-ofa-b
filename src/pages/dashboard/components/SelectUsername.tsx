import React, { FunctionComponent, useState } from 'react'
import { TextField, Button, Box } from '@material-ui/core'
import styled from 'styled-components/macro'
import { useTheme } from 'styled-components'

const StyledTextfield = styled(TextField)`
  && .MuiInputBase-input {
    color: ${props => props.theme.colors.lightPrimary};
  }
`

export interface SelectUsernameProps {
  submitUsername: (e: any) => void
  setUsername: Function
  isValid: Function
}

export const SelectUsername: FunctionComponent<SelectUsernameProps> = ({ submitUsername, setUsername, isValid }) => {
  const theme = useTheme()

  const handleChange = async e => {
    e.preventDefault()
    setUsername(e.target.value)
    isValid()
  }

  return (
    <>
      <form autoComplete="off" onSubmit={submitUsername}>
        <Box display="flex" flexDirection="column" gridGap="1em">
          <StyledTextfield
            color="secondary"
            label="username"
            onChange={e => handleChange(e)}
            placeholder="Your username..."
            onKeyPress={e => {
              if (e.key === 'Enter') {
                submitUsername(e)
              }
            }}
            inputRef={input => input && input.focus()}
            InputProps={{ disableUnderline: true }}
          />
          <Box alignSelf="end">
            <Button
              onClick={e => submitUsername(e)}
              type="submit"
              variant="contained"
              color="secondary"
              disabled={!isValid()}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </form>
    </>
  )
}
