import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { logOutUser } from '../../../redux/user'
import avatar from '../../../assets/avatar.png'
import './button-log-out.css'

const ButtonLogOut = () => {
  const { userData } = useSelector((state) => state.user)
  const { username, image } = userData

  const dispatch = useDispatch()

  const handleLogOut = () => {
    try {
      dispatch(logOutUser())
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="header__auth">
      <Link to="/new-article" className="header__button _create">
        Create article
      </Link>
      <div className="article__user-info-header">
        <Link to="/profile">
          <div className="article__user-group-name">
            <div className="article__user-name">{username}</div>
            <img src={image || avatar} alt="user avatar" />
          </div>
        </Link>
      </div>
      <a className="header__button _log-out" onClick={handleLogOut}>
        Log Out
      </a>
    </div>
  )
}

export default ButtonLogOut
