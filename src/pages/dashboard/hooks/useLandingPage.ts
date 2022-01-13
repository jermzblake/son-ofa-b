import React, { useEffect, useState } from 'react'
import socket from '../../../socket'
import { useNavigate } from 'react-router-dom'

export const useLandingPage = () => {
  const [usernameSelected, setUsernameSelected] = useState(false)
  const [username, setUsername] = useState<string>()
  const navigate = useNavigate()
  
  useEffect(() => {
    socket.on("connect_error", (err) => {
      if (err.message === "invalid username") {
        setUsernameSelected(false);
        // Should I handle this low-level error (notify user of connection failure?)
      }
    })
    return () => {
      socket.off("connect_error")
    }
  }, [])

  const isValid = () => {
    return username?.length > 2
  }

  const submitUsername = (e: any) => {
    e.preventDefault()
    if (!isValid()) return
    setUsernameSelected(true)
    socket.auth = { username }
    socket.connect()
    navigate('/lobby')
  }
  
  return {
    usernameSelected,
    setUsernameSelected,
    submitUsername,
    username,
    setUsername,
    isValid
   } as const
}