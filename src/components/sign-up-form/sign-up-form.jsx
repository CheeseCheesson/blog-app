/* eslint-disable */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Form, Input, Button, Checkbox, Divider } from 'antd'
import { useDispatch } from 'react-redux'

import styles from './sign-up-form.module.css'
//cheese cheese@ch.ch
const SignUpForm = ({ onRegistration, errorMessage, onErrorNull, errorData }) => {
  const dispatch = useDispatch()
  const [viewErrorUp, setViewErrorUp] = useState({})
  const [stateError, setStateError] = useState(false)

  const [form] = Form.useForm()

  const nameValueUsername = Form.useWatch('username', form)
  const nameValueEmail = Form.useWatch('email', form)

  useEffect(() => {
    let isMounted = true

    if (errorMessage && isMounted) {
      setStateError(true)
    }
    if ((nameValueEmail || nameValueUsername) && isMounted && stateError) {
      setViewErrorUp({})
      setStateError(false)
      return () => {
        setStateError(false)
        dispatch(onErrorNull())
      }
    }
    if (errorMessage && isMounted) {
      setViewErrorUp({
        email: `email: ${errorData['email']}`,
        username: `Username: ${errorData['username']}`,
      })
    }
    window.addEventListener('beforeunload', () => dispatch(onErrorNull()))
    return () => {
      dispatch(onErrorNull())
      window.removeEventListener('beforeunload', () => dispatch(onErrorNull()))
      setStateError(false)
      setViewErrorUp({})
      isMounted = false
    }
  }, [nameValueEmail, nameValueUsername, errorMessage, dispatch, onErrorNull])

  return (
    <Form
      layout="vertical"
      size="large"
      form={form}
      className={styles['ant-form']}
      initialValues={{
        remember: true,
      }}
      onFinish={(value) => {
        onRegistration(value)
      }}
    >
      <div className={styles['form-title']}>
        <span>Create new account</span>
      </div>

      <Form.Item
        className={styles['ant-form-item']}
        name="username"
        label="Username"
        validateStatus={errorMessage && errorData.hasOwnProperty('username') ? 'error' : 'success'}
        rules={[
          {
            required: true,
            message: 'Имя пользователя должно содержать от 3 до 20 символов.',
            min: 3,
            max: 20,
          },
        ]}
      >
        <Input type="text" placeholder="Username" />
      </Form.Item>
      {errorMessage && errorData.hasOwnProperty('username') && (
        <p style={{ color: '#fc6468' }}>Username: {viewErrorUp['username']}</p>
      )}
      <Form.Item
        className={styles['ant-form-item']}
        label="Email address"
        name="email"
        validateStatus={errorMessage && errorData.hasOwnProperty('email') ? 'error' : 'success'}
        rules={[
          {
            type: 'email',
            required: true,
            message: 'Please input your email!',
          },
        ]}
      >
        <Input placeholder="Email address" />
      </Form.Item>
      {errorMessage && errorData.hasOwnProperty('email') && (
        <p style={{ color: '#fc6468' }}>email: {viewErrorUp['email']}</p>
      )}
      <Form.Item
        className={styles['ant-form-item']}
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Пароль должен содержать от 6 до 40 символов.',
            min: 6,
            max: 40,
          },
        ]}
      >
        <Input.Password type="password" placeholder="Password" />
      </Form.Item>

      <Form.Item
        className={styles['ant-form-item']}
        name="confirm"
        label="Repeat Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Passwords must match',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve()
              }

              return Promise.reject(new Error('Два введенных вами пароля не совпадают!'))
            },
          }),
        ]}
      >
        <Input.Password placeholder="Password" />
      </Form.Item>

      <Divider className={styles['ant-divider']} />

      <Form.Item
        className={styles['ant-form-item']}
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value ? Promise.resolve() : Promise.reject(new Error('Следует принять соглашение')),
          },
        ]}
      >
        <Checkbox>I agree to the processing of my personal information</Checkbox>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className={styles['login-form-button']}>
          Create
        </Button>
        <span>
          Don’t have an account? <Link to="/sign-in">Sign In</Link>.
        </span>
      </Form.Item>
    </Form>
  )
}
SignUpForm.propTypes = {
  onRegistration: PropTypes.func.isRequired,
}
export default SignUpForm
