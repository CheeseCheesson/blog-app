/* eslint-disable */
import React, { useState, useEffect } from 'react'
import { Form, Input, Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import styles from './edit-profile-form.css'

const EditProfileForm = ({ errorData, errorMessage, onEditUserData, onErrorNull }) => {
  const [viewError, setViewError] = useState({})
  const [stateError, setStateError] = useState(false)
  const { userData } = useSelector((state) => state.user)
  const { email, username } = userData
  const dispatch = useDispatch()

  const newFields = [
    {
      name: ['username'],
      value: username || '',
    },
    {
      name: ['email'],
      value: email || '',
    },
  ]
  const [fields, setVewFields] = useState('')
  const [form] = Form.useForm()
  const nameValue = Form.useWatch('username', form)
  const nameValueEmail = Form.useWatch('email', form)

  useEffect(() => {
    if (!errorMessage) {
      setVewFields(newFields)
    } 
  }, [email, username])

  useEffect(() => {
    let isMounted = true

    if (errorMessage && isMounted) {
      setStateError(true)
    }
    if ((nameValue || nameValueEmail) && isMounted && stateError) {
      setViewError({})
      setStateError(false)
      return () => {
        setStateError(false)
        dispatch(onErrorNull())
      }
    }
    if (errorMessage && isMounted) {
      setViewError({
        username: `username: ${errorData['username']}`,
        email: `email: ${errorData['email']}`,
      })
    }
    window.addEventListener('beforeunload', () => dispatch(onErrorNull()))
    return () => {
      dispatch(onErrorNull())
      window.removeEventListener('beforeunload', () => dispatch(onErrorNull()))
      setViewError({})
      setStateError(false)
      isMounted = false
    }
  }, [errorMessage, nameValue, nameValueEmail, dispatch, onErrorNull])

  return (
    <Form
      name="dynamic_form_item"
      layout="vertical"
      size="large"
      form={form}
      className={styles['ant-form']}
      onFinish={(value) => {
        onEditUserData(value, userData)
      }}
      fields={fields}
    >
      <div className={styles['form-title']}>
        <span>Edit Profile</span>
      </div>

      <Form.Item
        className={styles['ant-form-item']}
        name="username"
        label="Username"
        validateStatus={errorMessage && errorData.hasOwnProperty('username') ? 'error' : 'success'}
        rules={[
          {
            required: true,
            message: 'Your username must be between 3 and 20 characters long.',
            min: 3,
            max: 20,
          },
        ]}
      >
        <Input type="text" />
      </Form.Item>
      {errorMessage && errorData.hasOwnProperty('username') && (
        <p style={{ color: '#fc6468' }}>Username: {viewError['username']}</p>
      )}
      <Form.Item
        className={styles['ant-form-item']}
        label="Email address"
        validateStatus={errorMessage && errorData.hasOwnProperty('email') ? 'error' : 'success'}
        name="email"
        rules={[
          {
            type: 'email',
            required: true,
            message: 'Please input your email!',
          },
        ]}
      >
        <Input />
      </Form.Item>
        {errorMessage && errorData.hasOwnProperty('email') && (
        <p style={{ color: '#fc6468' }}>email: {viewError['email']}</p>
        )}
      <Form.Item
        className={styles['ant-form-item']}
        name="password"
        label="New password"
        rules={[
          {
            message: 'Your password must be between 6 and 40 characters long.',
            min: 6,
            max: 40,
          },
        ]}
      >
        <Input.Password type="password" placeholder="New password" />
      </Form.Item>

      <Form.Item
        className={styles['ant-form-item']}
        name="image"
        label="Avatar image (url)"
        rules={[
          {
            type: 'url',
            warningOnly: true,
          },
        ]}
      >
        <Input placeholder="Avatar image" />
      </Form.Item>

      <Form.Item className={styles['ant-form-item-control-input-content']}>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  )
}

EditProfileForm.propTypes = {
  // transferData: PropTypes.func.isRequired,
  // email: PropTypes.string.isRequired,
  // username: PropTypes.string.isRequired,
}

export default EditProfileForm
