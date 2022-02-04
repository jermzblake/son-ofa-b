import React, { useEffect, useState } from 'react'
import socket from '../../../socket'
import { useNavigate } from 'react-router-dom'
import { useLocalStorage } from 'hooks/use-local-storage/useLocalStorage'

export const useLandingPage = () => {
  const [usernameSelected, setUsernameSelected] = useState(false)
  const [username, setUsername] = useState<string>()
  const navigate = useNavigate()
  const { getItem, setItem } = useLocalStorage()
  
  useEffect(() => {
    const sessionId = getItem("sessionId")
    const sessionUsername = getItem("username")

    if (sessionId) {
      if (username) {
        socket.auth = { sessionUsername }
        setUsernameSelected(true)
      }
      socket.auth = { sessionId }
      socket.connect()
      navigate('/lobby')
    }


    socket.on("session", ({ sessionId, userId, username }) => {
      // attach the session ID to the next reconnection attempts
      socket.auth = { sessionId }
      // store it in the localStorage
      setItem("sessionId", sessionId);
      // save the ID of the user
      (socket as any).userId = userId
      // store username in local storage
      setItem("username", username);
      //save the username  to the user
      (socket as any).username = username
    })

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