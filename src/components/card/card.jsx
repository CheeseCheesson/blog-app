import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { v4 as uuidv4 } from 'uuid'
import { useSelector } from 'react-redux'
import { HeartOutlined, HeartFilled } from '@ant-design/icons'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'

import apiService from '../../services/apiService'
import avatar from '../../assets/avatar.png'
import './card.css'

const Card = ({ title, favorited, favoritesCount, tagList, author, description, createdAt, slug, children }) => {
  const paramSlug = `/articles/${slug}`
  const { username: authorName, image: authorAvatar } = author

  const [like, setLike] = useState(favorited)
  const [likeIcon, setLikeIcon] = useState(false)
  const [likeCount, setLikeCount] = useState(favoritesCount)
  const { userData } = useSelector((state) => state.user)

  useEffect(() => {
    if (favorited && userData) {
      setLike(true)
      setLikeIcon(HeartFilled)
    }
  }, [favorited, favoritesCount])

  const handleLikeClick = () => {
    if (!like && userData) {
      apiService.postAddFavorites(slug).then((res) => {
        if (res.article['favorited']) {
          setLike(true)
          setLikeIcon(true)
          setLikeCount(res.article['favoritesCount'])
        }
      })
    } else if (like && userData) {
      apiService.deleteFavorites(slug).then((res) => {
        if (!res.article['favorited']) {
          setLike(false)
          setLikeIcon(false)
          setLikeCount(res.article['favoritesCount'])
        }
      })
    }
  }

  return (
    <div className="card__item">
      <div className="card__card-content">
        <div className="card__head">
          <div className="card__head-group">
            <div className="card__head-group-top">
              <div className="card__title">
                <Link to={paramSlug} className="card__link">
                  {title}
                </Link>
              </div>
              <div className="card__hart">
                {likeIcon ? (
                  <HeartFilled onClick={handleLikeClick} style={{ color: '#ff0303' }} />
                ) : (
                  <HeartOutlined onClick={handleLikeClick} />
                )}
                <span>{likeCount}</span>
              </div>
              <div className="card__user-info">
                <div className="card__user-group">
                  <div className="card__user-group-name">
                    <div className="card__user-name">{authorName}</div>
                    <div className="card__user-birthday">{format(new Date(createdAt), 'LLLL d, y')}</div>
                  </div>
                </div>
                <img
                  className="card__user-avatar"
                  src={authorAvatar === 'null' ? avatar : authorAvatar}
                  alt="user avatar"
                />
              </div>
            </div>
            <div className="card__head-group-bottom">
              {tagList.map(
                (tag) =>
                  tag.length && (
                    <span key={uuidv4()} className="card__tag">
                      {tag}
                    </span>
                  )
              )}
            </div>
          </div>
        </div>
        <div className="card__body">
          <div className="card__text">
            <p>{description}</p>
          </div>
        </div>
      </div>
      {children}
    </div>
  )
}
Card.defaultProps = {
  controllerFlag: false,
  title: '',
  favorited: false,
  favoritesCount: null,
  tagList: [],
  description: '',
  createdAt: '',
  slug: '',
}
Card.propTypes = {
  title: PropTypes.string,
  favorited: PropTypes.bool,
  favoritesCount: PropTypes.number,
  tagList: PropTypes.array,
  author: PropTypes.object,
  description: PropTypes.string,
  createdAt: PropTypes.string,
  slug: PropTypes.string,
}
export default Card
