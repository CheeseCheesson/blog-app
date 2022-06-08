import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'

import Article from '../../components/article/article'
import apiService from '../../services/apiService'
import SuccessMessage from '../../components/UI/success-message/success-message'
import Loader from '../../components/UI/loader/loader'
import ErrorMessage from '../../components/UI/error-massege'

const ArticleOne = () => {
  const { slug } = useParams()
  const [item, setItem] = useState({})
  const [controllerShow, setControllerShow] = useState(false)
  const [isLoading, setLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [errorText, setErrorText] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const { userData, status } = useSelector((state) => state.user)
  const navigate = useNavigate()

  useEffect(() => {
    apiService
      .getAarticleFull(slug, userData)
      .then((res) => {
        if (userData && userData.username === res.article.author.username) {
          setControllerShow(true)
        }

        setItem(res.article)
        setLoading(false)
        setIsError(false)
      })
      .catch(() => {
        setIsError(true)
        setErrorText('You are not authorized to view this article')
        setLoading(false)
      })
  }, [slug, isLoading, userData, status])

  const onCloseMessage = () => {
    setIsError(false)
    setErrorText('')
    setLoading(false)
  }

  const confirmDeletion = () => {
    apiService.deleteArticle(slug).then((res) => {
      if (String(res.status)[0] === '2') {
        setIsSuccess(true)
        navigate('/articles', { replace: true })
      } else {
        setErrorText(`error: ${res.status} ${res.statusText}`)
        setIsError(true)
      }
    })
  }

  return (
    <>
      {isError && <ErrorMessage description={errorText} closingAlert={onCloseMessage} />}
      {isSuccess && !isError && (
        <SuccessMessage description="Article successfully removed!" closingAlert={onCloseMessage} closable={false} />
      )}
      {isLoading && !isError && <Loader />}
      {Object.keys(item).length !== 0 && !isSuccess && (
        <Article item={item} controllerFlag={controllerShow} confirmDeletion={confirmDeletion} isError={isError} />
      )}
    </>
  )
}

export default ArticleOne
