import React from 'react'
import { Outlet } from 'react-router-dom'

import Header from '../UI/header/header'
import './main-layout.css'

const MainLayout = () => {
  return (
    <div className="wrapper">
      <Header />
      <main className="page">
        <div className="page__container card">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default MainLayout
