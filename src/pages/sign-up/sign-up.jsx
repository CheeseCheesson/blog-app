import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import SignUpForm from '../../components/sign-up-form/sign-up-form'
import { fetchUserRegistration, errorNull } from '../../redux/user'
import Loader from '../../components/UI/loader/loader'

const SignUp = () => {
  const dispatch = useDispatch()
  const { error, status, errorData } = useSelector((state) => state.user)
  const navigate = useNavigate()

  useEffect(() => {
    if (status === 'resolved') {
      navigate('/articles', { replace: true })
      return () => dispatch(errorNull())
    }
  }, [error, dispatch, status])

  const handleRegistration = (value) => {
    const newUser = {
      username: value.username.trim(),
      email: value.email.trim(),
      password: value.password.trim(),
    }
    dispatch(fetchUserRegistration(newUser))
  }

  return (
    <>
      {status !== 'loading' && (
        <SignUpForm
          errorData={errorData}
          errorMessage={error}
          onErrorNull={errorNull}
          onRegistration={handleRegistration}
        />
      )}
      {status === 'loading' && <Loader />}
    </>
  )
}

export default SignUp
