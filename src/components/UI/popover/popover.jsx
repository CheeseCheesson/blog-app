import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Popover } from 'antd'
import { ExclamationCircleFilled } from '@ant-design/icons'

const PopoverItem = ({ children, confirmDeletion }) => {
  const [visible, setVisible] = useState({
    visible: false,
  })
  const handleVisibleChange = (visible) => {
    setVisible({ visible })
  }
  const handleHide = () => {
    setVisible((prevState) => ({
      ...prevState,
      visible: false,
    }))
  }
  const handleDirect = () => {
    confirmDeletion()
  }

  const content = (
    <div style={{ textAlign: 'end' }}>
      <p style={{ display: 'flex', alignItems: 'center' }}>
        <ExclamationCircleFilled style={{ fontSize: '16px', color: '#faad14', marginRight: '10px' }} />
        <span>Are you sure to delete this article?</span>
      </p>
      <Button onClick={handleHide} size="small" style={{ marginRight: '10px' }}>
        No
      </Button>
      <Button size="small" type="primary" onClick={handleDirect}>
        Yes
      </Button>
    </div>
  )

  return (
    <Popover
      content={content}
      title="Title"
      trigger="click"
      visible={visible.visible}
      placement="right"
      onVisibleChange={handleVisibleChange}
    >
      {children}
    </Popover>
  )
}
PopoverItem.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  confirmDeletion: PropTypes.func.isRequired,
}
export default PopoverItem
