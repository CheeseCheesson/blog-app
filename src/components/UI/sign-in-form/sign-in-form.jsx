import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Form, Input, Button } from 'antd'

import styles from './sign-in-form.module.css'

const SignInForm = ({ onAuthenticated, errorMessage }) => {
  return (
    <Form
      layout="vertical"
      name="normal_login"
      size="large"
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
        validateStatus={errorMessage ? 'error' : 'success'}
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
      {errorMessage && <p style={{ color: '#fc6468' }}>{errorMessage}</p>}

      <Form.Item
        className={styles['ant-form-item']}
        name="password"
        label="Password"
        validateStatus={errorMessage ? 'error' : 'success'}
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input.Password type="password" placeholder="Password" />
      </Form.Item>

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
