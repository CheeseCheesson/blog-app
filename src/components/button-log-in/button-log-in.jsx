import React from 'react'
import { Link } from 'react-router-dom'

import './button-log-in.css'

const ButtonLogIn = () => {
  return (
    <div className="header__login-btn">
      <Link to="/sign-in" className="header__button _in">
        Sign In
      </Link>
      <Link to="/sign-up" className="header__button _up">
        Sign Up
      </Link>
    </div>
  )
}

export default ButtonLogIn
