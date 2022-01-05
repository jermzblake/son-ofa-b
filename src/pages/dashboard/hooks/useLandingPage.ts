import React, { useState } from 'react'
import socket from '../../../socket'

export const useLandingPage = () => {
  const [usernameSelected, setUsernameSelected] = useState(false)
  const [username, setUsername] = useState<string>()

  const submitUsername = () => {
    console.log('start')
    setUsernameSelected(true)
    socket.auth = { username }
    console.log('here')
    socket.connect()
    console.log('end')
  }
  
  return {
    usernameSelected,
    setUsernameSelected,
    submitUsername,
    username,
    setUsername
   } as const
}