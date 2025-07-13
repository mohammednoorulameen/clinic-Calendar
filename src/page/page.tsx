"use client"

import { useState, useEffect } from "react"
import  Login  from "../Components/Login"
import  Calendar  from "../Components/Calendar"
import { getUser } from "../lib/data"

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const user = getUser()
    setIsAuthenticated(user?.isAuthenticated || false)
    setIsLoading(false)
  }, [])

  const handleLogin = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  return <>{isAuthenticated ? <Calendar onLogout={handleLogout} /> : <Login onLogin={handleLogin} />}</>
}
