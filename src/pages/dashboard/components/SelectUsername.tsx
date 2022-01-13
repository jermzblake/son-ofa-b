import React, { FunctionComponent, useState } from 'react'
import { TextField, Button } from '@material-ui/core'

export interface SelectUsernameProps {
  usernameSelected: boolean
  setUsernameSelected: Function
  submitUsername: (e: any) => void
  username: string
  setUsername: Function
  isValid: Function
}

export const SelectUsername: FunctionComponent<SelectUsernameProps> = ({ usernameSelected, setUsernameSelected, submitUsername, username, setUsername, isValid }) => {

  const handleChange = async(e) => {
    e.preventDefault()
    setUsername(e.target.value)
    isValid()
  }

  return (
    <>
      <form autoComplete="off" onSubmit={submitUsername}>
        <TextField
          label="username"
          onChange={e => handleChange(e)}
          placeholder="Your username..."
          onKeyPress={e => {
            if (e.key === 'Enter') {
              submitUsername(e)
            }
          }}
        />
        <Button
          onClick={e => submitUsername(e)}
          type="submit"
          variant="contained"
          color="primary"
          disabled={!isValid()}
        >
          Submit
        </Button>
      </form>
    </>
  )
}