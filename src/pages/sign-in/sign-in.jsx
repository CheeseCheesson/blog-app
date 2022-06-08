/* eslint-disable */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { fetchUserLogIn, errorNull } from '../../redux/user'
import SignInForm from '../../components/UI/sign-in-form/sign-in-form'
import Loader from '../../components/loader/loader'

const SignIn = () => {
  const dispatch = useDispatch()
  const { error, status } = useSelector((state) => state.user)
  const navigate = useNavigate()

  useEffect(() => {
    if (status === 'resolved' && !error) {
      navigate('/articles')
      return () => dispatch(errorNull())
    }

  }, [error, dispatch, status])

  const handleAuthenticated = (val) => {
    const lodinData = {
      email: val.email.trim(),
      password: val.password.trim(),
    }
    dispatch(fetchUserLogIn(lodinData))
  }

  return (
    <>
      {status !== 'loading' && <SignInForm errorMessage={error} onAuthenticated={handleAuthenticated} />}
      {status === 'loading' && <Loader />}
    </>
  )
}

export default SignIn
