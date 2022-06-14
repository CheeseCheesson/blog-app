/* eslint-disable */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Form, Input, Button } from 'antd'
import { useDispatch } from 'react-redux'

import styles from './sign-in-form.module.css'
//cheese cheese@ch.ch
const SignInForm = ({ onAuthenticated, errorData, errorMessage, onErrorNull }) => {
  const [viewError, setViewError] = useState({})
  const [stateError, setStateError] = useState(false)
  const dispatch = useDispatch()

  const [form] = Form.useForm()
  const nameValue = Form.useWatch('email', form)
  const nameValuePass = Form.useWatch('password', form)

  useEffect(() => {
    let isMounted = true

    if (errorMessage && isMounted) {
      setStateError(true)
    }
    if ((nameValue || nameValuePass) && isMounted && stateError) {
      setViewError({})
      setStateError(false)
      return () => {
        setStateError(false)
        dispatch(onErrorNull())
      }
    }
    if (errorMessage && isMounted) {
      setViewError({
        email: `email: ${errorData["email or password"]}`,
        password: `password: ${errorData["email or password"]}`,
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
  }, [errorMessage, nameValue, nameValuePass, dispatch, onErrorNull])
  return (
    <Form
      layout="vertical"
      name="normal_login"
      size="large"
      form={form}
      className={styles['ant-form']}
      initialValues={{
        remember: true,
      }}
      onFinish={(value) => {
        onAuthenticated(value)
      }}
    >
      <div className={styles['form-title']}>
        <span>Sign In</span>
      </div>

      <Form.Item
        className={styles['ant-form-item']}
        label="Email address"
        name="email"
        validateStatus={Object.entries(viewError).length ? 'error' : 'success'}
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
      <p className={styles['ant-form-castom-error']}>{errorMessage && <span>{viewError.email}</span>}</p>

      <Form.Item
        className={styles['ant-form-item']}
        name="password"
        label="Password"
        validateStatus={Object.entries(viewError).length ? 'error' : 'success'}
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input.Password type="password" placeholder="Password" />
      </Form.Item>
      <p className={styles['ant-form-castom-error']}>{errorMessage && <span>{viewError.password}</span>}</p>
      <Form.Item className={styles['ant-form-item-control-input-content']}>
        <Button type="primary" htmlType="submit" className={styles['login-form-button']}>
          Log in
        </Button>
        <span>
          Don’t have an account? <Link to="/sign-up">Sign Up</Link>.
        </span>
      </Form.Item>
    </Form>
  )
}
SignInForm.propTypes = {
  onAuthenticated: PropTypes.func.isRequired,
}
export default SignInForm
