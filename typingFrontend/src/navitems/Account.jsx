import React from 'react'
import '../styles/Login.css'
import { useNavigate } from 'react-router-dom'

const Account = () => {
    const navigate = useNavigate()

    const handleLogOut = () => {
        localStorage.removeItem('logintoken')
        localStorage.removeItem('username')
        navigate("/")
    }
  return (
    <>
        <button onClick={handleLogOut}>Log Out</button>
    </>
  )
}

export default Account