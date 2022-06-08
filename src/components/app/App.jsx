import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'

import MainLayout from '../main/main-layout'
import CardList from '../../pages/card-list/card-list'
import SignIn from '../../pages/sign-in/sign-in'
import SignUp from '../../pages/sign-up/sign-up'
import Profile from '../../pages/profile/profile'
import NewArticle from '../../pages/new-article/new-article'
import ArticleOne from '../../pages/article-one/article-one'
import ArticleEdit from '../../pages/article-edit/article-edit'
import AuthData from '../auth-data/auth-data'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/articles" element={<CardList />} />
        <Route path="/" element={<Navigate to="/articles" />} />
        <Route path="/articles/:slug" element={<ArticleOne />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route
          path="profile"
          element={
            <AuthData>
              <Profile />
            </AuthData>
          }
        />
        <Route
          path="/new-article"
          element={
            <AuthData>
              <NewArticle />
            </AuthData>
          }
        />
        <Route
          path="/articles/:slug/edit"
          element={
            <AuthData>
              <ArticleEdit />
            </AuthData>
          }
        />
        <Route path="*" element={<Navigate to="/articles" />} />
      </Route>
    </Routes>
  )
}

export default App
