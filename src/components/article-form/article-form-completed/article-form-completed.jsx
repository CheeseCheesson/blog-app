import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Button } from 'antd'
import { useNavigate } from 'react-router-dom'

import styles from './article-form.module.css'

const ArticleFormCompleted = ({ transferData, title, description, articleTitle, articleBody, tagList }) => {
  const navigate = useNavigate()
  const newFields = [
    {
      name: ['title'],
      value: articleTitle || null,
    },
    {
      name: ['description'],
      value: description || null,
    },
    {
      name: ['body'],
      value: articleBody || null,
    },
    {
      name: ['tagList'],
      value: tagList && tagList.length ? tagList : [''],
    },
  ]
  const [fields, setFields] = useState(newFields)

  useEffect(() => {
    setFields(newFields)
  }, [title, description, articleTitle, articleBody, tagList])
  const handleFinish = (val) => {
    transferData(val)
  }
  return (
    <Form
      name="dynamic_form_item"
      layout="vertical"
      size="large"
      className={styles['ant-form']}
      onFinish={handleFinish}
      fields={fields}
    >
      <div className={styles['form-title']}>
        <span>{title}</span>
      </div>
      <Form.Item
        className={styles['ant-form-item']}
        name="title"
        label="Title"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input type="text" placeholder="Title" />
      </Form.Item>

      <Form.Item
        className={styles['ant-form-item']}
        name="description"
        label="Short description"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input type="text" placeholder="Short description" />
      </Form.Item>

      <Form.Item
        className={styles['ant-form-item']}
        name="body"
        label="Text"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input.TextArea
          type="text"
          placeholder="Text"
          className={styles['ant-input']}
          rules={[
            {
              required: true,
            },
          ]}
        />
      </Form.Item>

      <div className={styles['form-item-list__wrapper']}>
        <Form.List name="tagList">
          {(fieldsList, { add, remove }) => (
            <>
              {fieldsList.map((field, index) => (
                <Form.Item label={index === 0 ? 'Tags' : ''} className={styles['ant-form-item']} key={field.key}>
                  <Form.Item {...field} noStyle>
                    <Input placeholder="Tag" className={styles['ant-form-item__tag']} />
                  </Form.Item>

                  {fieldsList.length > 1 ? (
                    <Button
                      onClick={() => {
                        remove(field.name)
                      }}
                      className={styles['form-item-list__del-button']}
                    >
                      Delete
                    </Button>
                  ) : null}
                </Form.Item>
              ))}

              <Form.Item>
                <Button
                  className={
                    fieldsList.length > 1
                      ? styles[('form-item-list__add-button', 'with-delete-button')]
                      : styles['form-item-list__add-button_clear']
                  }
                  onClick={() => {
                    add()
                  }}
                >
                  Add tag
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item>
          <Button
            onClick={() => () => navigate('/')}
            size="large"
            type="primary"
            htmlType="submit"
            className={styles['form-item-list__send-button']}
          >
            Send
          </Button>
        </Form.Item>
      </div>
    </Form>
  )
}
ArticleFormCompleted.defaultProps = {
  title: '',
  tagList: [],
  description: '',
}

ArticleFormCompleted.propTypes = {
  transferData: PropTypes.func.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  articleTitle: PropTypes.string,
  articleBody: PropTypes.string,
  tagList: PropTypes.array,
}
export default ArticleFormCompleted
