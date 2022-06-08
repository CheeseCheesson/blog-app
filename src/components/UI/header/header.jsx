import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import ButtonLogOut from '../../button-log-out/button-log-out'
import ButtonLogIn from '../../button-log-in/button-log-in'
import './header.css'

const Header = () => {
  const { userData } = useSelector((state) => state.user)

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/articles" className="header__site-name">
          Realworld Blog
        </Link>
        <div className="header__buttons">{userData ? <ButtonLogOut /> : <ButtonLogIn />}</div>
      </div>
    </header>
  )
}

export default Header
