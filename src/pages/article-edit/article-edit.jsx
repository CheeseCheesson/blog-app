/* eslint-disable */
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import apiService from '../../services/apiService'
import ArticleFormCompleted from '../../components/article-form/article-form-completed/article-form-completed'
import SuccessMessage from '../../components/UI/success-message/success-message'
import ErrorMessage from '../../components/UI/error-massege/error-message'
import Loader from '../../components/UI/loader/loader'
const ArticleEdit = () => {
  const { slug } = useParams()
  const [articleTitle, setArticleTitle] = useState('')
  const [description, setDescription] = useState('')
  const [articleBody, setArticleBody] = useState('')
  const [tagList, setTagList] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [errorText, setErrorText] = useState('')
  const [isSuccessAlert, setSuccessAlert] = useState(false)
  const { userData } = useSelector((state) => state.user)
  const { list } = useSelector((state) => state.articles)
  const navigate = useNavigate()
console.log(slug);
  const currentArticle = list.find(article => article.slug === slug)
  if(currentArticle.author.username !== userData.username) {
    navigate('/')
  }
  const updateFormData = () => {
    apiService.getAarticleFull(slug, userData).then((res) => {
      setTagList(res.article.tagList)
      setDescription(res.article.description)
      setArticleTitle(res.article.title)
      setArticleBody(res.article.body)
    })
  }
  useEffect(() => {
    updateFormData()
  }, [])
  const articleUpdate = (val) => {
    const modifiedArticle = {
      title: val.title.trim(),
      description: val.description.trim(),
      body: val.body,
      tagList: val.tagList.map((el) => el.trim()).filter((el) => el && el !== ''),
    }
    setLoading(true)
    apiService
      .putArticleUpdate(slug, modifiedArticle)
      .then((res) => {
        if (res.article) {
          setLoading(false)
          setSuccessAlert(true)
          updateFormData()
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
  }
  const handelCloseAletr = () => {
    setSuccessAlert(false)
    setIsError(false)
  }
  return (
    <>
      {isSuccessAlert && (
        <SuccessMessage description="Сталья успешно обновлена!" closingAlert={handelCloseAletr} closable={true} />
      )}
      {isError && <ErrorMessage description={errorText} closingAlert={handelCloseAletr} />}

      {isLoading && <Loader />}
      {
        <ArticleFormCompleted
          title="Edit article"
          tagList={tagList}
          description={description}
          articleTitle={articleTitle}
          articleBody={articleBody}
          transferData={articleUpdate}
        />
      }
    </>
  )
}

export default ArticleEdit
