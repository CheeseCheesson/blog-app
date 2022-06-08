import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import ArticleForm from '../../components/article-form/article-form'
import apiService from '../../services/apiService'
import SuccessMessage from '../../components/UI/success-message/success-message'
import ErrorMessage from '../../components/UI/error-massege/error-message'
import Loader from '../../components/UI/loader/loader'

const NewArticle = () => {
  const [isLoading, setLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [errorText, setErrorText] = useState('')
  const [isSuccessAlert, setSuccessAlert] = useState(false)
  const navigate = useNavigate()
  const createArticle = (val) => {
    const newArticle = {
      title: val && val.title.trim(),
      description: val && val.description.trim(),
      body: val.body,
      tagList: val.tagList.map((el) => el && el.trim()).filter((el) => el && el !== ''),
    }
    setLoading(true)

    try {
      apiService
        .postCreateArticle(newArticle)
        .then((res) => {
          if (res.article) {
            setLoading(false)
            setSuccessAlert(true)
            setIsError(false)
          }
          if (res.errors) {
            setLoading(false)
            setIsError(true)
            const errorStr = `${res.errors.error.status} ${res.errors.message}`
            setErrorText(errorStr)
          }
        })
        .catch(() => {
          setLoading(false)
          setIsError(true)
          setErrorText('Ошибка загрузки данных. Попробуйте перезагрузить страницу или повторите попытку позже.')
        })
        .finally(() => {
          navigate('/articles', { replace: true })
        })
    } catch (err) {
      setLoading(false)
      console.log(err)
    }
  }
  const atCloseAletr = () => {
    setSuccessAlert(false)
    setIsError(false)
  }

  return (
    <>
      {isSuccessAlert && (
        <SuccessMessage description="Article created successfully!" closingAlert={atCloseAletr} closable />
      )}
      {isError && <ErrorMessage description={errorText} closingAlert={atCloseAletr} />}
      {!isLoading && !isError && !isSuccessAlert && (
        <ArticleForm transferData={createArticle} title="Создать новую статью" />
      )}
      {isLoading && !isError && <Loader />}
    </>
  )
}

export default NewArticle
