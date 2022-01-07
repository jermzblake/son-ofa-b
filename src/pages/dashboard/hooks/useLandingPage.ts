import React, { useEffect, useState } from 'react'
import socket from '../../../socket'

export const useLandingPage = () => {
  const [usernameSelected, setUsernameSelected] = useState(false)
  const [username, setUsername] = useState<string>()
  
  useEffect(() => {
    socket.on("connect_error", (err) => {
      if (err.message === "invalid username") {
        setUsernameSelected(false);
      }
    })
    return () => {
      socket.off("connect_error")
    }
  }, [])

  const submitUsername = (e: any) => {
    e.preventDefault()
    setUsernameSelected(true)
    socket.auth = { username }
    socket.connect()
  }
  
  return {
    usernameSelected,
    setUsernameSelected,
    submitUsername,
    username,
    setUsername
   } as const
}