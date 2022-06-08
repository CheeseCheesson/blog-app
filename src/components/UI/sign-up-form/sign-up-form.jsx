/* eslint-disable */
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Form, Input, Button, Checkbox, Divider } from 'antd'

import styles from './sign-up-form.module.css'

const SignUpForm = ({ onRegistration, errorMessage }) => {
  return (
    <Form
      layout="vertical"
      size="large"
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
        validateStatus={errorMessage ? 'error' : 'success'}
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
