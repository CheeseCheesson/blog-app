import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const AuthData = ({ children }) => {
  const { userData } = useSelector((state) => state.user)
  if (!userData) {
    return <Navigate to="/sign-in" />
  }
  return children
}

export default AuthData
