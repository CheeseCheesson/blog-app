import React from 'react'
import PropTypes from 'prop-types'
import { Alert } from 'antd'

const SuccessMessage = ({ description, closingAlert, closable }) => {
  return (
    <div>
      <Alert
        message="Success!"
        description={description}
        type="success"
        showIcon
        closable={closable}
        onClose={() => closingAlert()}
      />
    </div>
  )
}

SuccessMessage.defaultProps = {
  description: '',
  closable: true,
}

SuccessMessage.propTypes = {
  description: PropTypes.string,
  closingAlert: PropTypes.func,
  closable: PropTypes.bool,
}

export default SuccessMessage
