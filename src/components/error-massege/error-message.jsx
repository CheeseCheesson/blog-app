import React from 'react'
import PropTypes from 'prop-types'
import { Alert } from 'antd'
const ErrorMessage = ({ description, closingAlert }) => {
  return (
    <Alert message="Error" description={description} type="error" showIcon closable onClose={() => closingAlert()} />
  )
}

ErrorMessage.defaultProps = {
  description: '',
}

ErrorMessage.propTypes = {
  description: PropTypes.string,
  closingAlert: PropTypes.func,
}
export default ErrorMessage
