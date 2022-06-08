import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Button } from 'antd'

import styles from './edit-profile-form.css'

const EditProfileForm = ({ transferData, email, username, errorMessage }) => {
  const handleFinish = (value) => {
    transferData(value)
  }
  const CustomizedForm = ({ fields }) => {
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
          <span>Edit Profile</span>
        </div>

        <Form.Item
          className={styles['ant-form-item']}
          name="username"
          label="Username"
          validateStatus={errorMessage ? 'error' : 'success'}
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

        <Form.Item
          className={styles['ant-form-item']}
          label="Email address"
          validateStatus={errorMessage ? 'error' : 'success'}
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
        {errorMessage && <p style={{ color: '#fc6468' }}>{errorMessage}</p>}
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

  const CompletedForm = () => {
    const [fields] = useState([
      {
        name: ['username'],
        value: username || '',
      },
      {
        name: ['email'],
        value: email || '',
      },
    ])

    return <CustomizedForm fields={fields} />
  }

  return <CompletedForm />
}

EditProfileForm.propTypes = {
  transferData: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
}

export default EditProfileForm
