import React from 'react'
import PropTypes from 'prop-types'

import ArticleFormCompleted from './article-form-completed/article-form-completed'

const ArticleForm = ({ transferData, title, description, articleTitle, articleBody, tagList }) => {
  const handleFinish = (val) => {
    transferData(val)
  }
  return (
    <ArticleFormCompleted
      transferData={handleFinish}
      title={title}
      description={description}
      articleTitle={articleTitle}
      articleBody={articleBody}
      tagList={tagList}
    />
  )
}
ArticleForm.propTypes = {
  transferData: PropTypes.func.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  articleTitle: PropTypes.string,
  articleBody: PropTypes.string,
  tagList: PropTypes.array,
}
export default ArticleForm
