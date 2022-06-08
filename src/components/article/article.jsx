import React from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Button } from 'antd'
import { Link, useParams } from 'react-router-dom'

import Card from '../card/card'
import './article.css'
import ErrorMessage from '../UI/error-massege'
import PopoverItem from '../UI/popover/popover'

const Article = ({ item, controllerFlag, confirmDeletion, isError }) => {
  const { slug } = useParams()
  const paramSlug = `/articles/${slug}/edit`
  const renderers = {
    image: ({ alt, src, title }) => <img alt={alt} src={src} title={title} style={{ width: 475 }} />,
  }

  return (
    <>
      <Card {...item}>
        <div className="article__body">
          {isError ? (
            <ErrorMessage />
          ) : (
            <div className="article__text">
              <div className="article__text-body">
                <ReactMarkdown renderers={renderers} remarkPlugins={[remarkGfm]}>
                  {item.body}
                </ReactMarkdown>
              </div>
              {controllerFlag && (
                <div className="article__button">
                  <PopoverItem confirmDeletion={confirmDeletion}>
                    <Button className="article__button-item _delete">Delete</Button>
                  </PopoverItem>
                  <Link to={paramSlug} className="article__button-item _edit">
                    Edit
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </Card>
    </>
  )
}

Article.defaultProps = {
  controllerFlag: false,
  isError: false,
}

Article.propTypes = {
  item: PropTypes.shape({
    body: PropTypes.string,
  }).isRequired,
  controllerFlag: PropTypes.bool,
  isError: PropTypes.bool,
  confirmDeletion: PropTypes.func.isRequired,
}

export default Article
