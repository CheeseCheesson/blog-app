import React from 'react'
import { Spin } from 'antd'

import loaderStyle from './loader.module.css'

const Loader = () => {
  return (
    <div className={loaderStyle.loader}>
      <Spin size="large" />
    </div>
  )
}

export default Loader
