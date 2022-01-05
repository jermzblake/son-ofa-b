import React, { FunctionComponent, useState } from 'react'
import { TextField, Button } from '@material-ui/core'

export interface SelectUsernameProps {
  usernameSelected: boolean
  setUsernameSelected: Function
  submitUsername: () => void
  username: string
  setUsername: Function
}

export const SelectUsername: FunctionComponent<SelectUsernameProps> = ({ usernameSelected, setUsernameSelected, submitUsername, username, setUsername }) => {
  const isValid = () => {
    return username?.length > 2
  }

  const handleChange = async(e) => {
    e.preventDefault()
    setUsername(e.target.value)
    isValid()
  }

  return (
    <>
      <form autoComplete='off' onSubmit={submitUsername}>
        <TextField label='username' onChange={e => handleChange(e)} placeholder='Your username...' />
        <Button type="submit" variant="contained" color="primary" disabled={!isValid()}>Submit</Button>
      </form>
    </>
  )
}