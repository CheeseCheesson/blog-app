/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchUserUpdate, errorNull } from '../../redux/user'
import EditProfileForm from '../../components/UI/edit-profile-form/edit-profile-form'
import SuccessMessage from '../../components/success-message/success-message'
import ErrorMessage from '../../components/error-massege/error-message'
import Loader from '../../components/loader/loader'

const Profile = () => {
  const dispatch = useDispatch()
  const { error, status, userData } = useSelector((state) => state.user)
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    if (userData) {
      setEmail(userData.email)
      setUsername(userData.username)
    }

    if (status === 'loading') {
      setIsSuccess(false)
    }
  }, [status, userData])

  const editProfile = (val) => {
    const newUser = { ...userData }
    for (const prop in val) {
      if (val[prop] !== '' && val[prop] !== undefined) {
        newUser[prop] = val[prop]
      }
    }
    dispatch(fetchUserUpdate({ newUser, userData })).then(() => {
      try {
        setIsSuccess(true)
      } catch (err) {
        setIsSuccess(false)
        console.log(err)
      }
    })
  }
  const onCloseMessage = () => {
    dispatch(errorNull())
  }

  const atCloseSuccessMessage = () => {
    setIsSuccess(false)
  }

  return (
    <>
      {error
        ? error && <ErrorMessage description={error} closingAlert={onCloseMessage} />
        : isSuccess && (
            <SuccessMessage
              description="Profile edit successfully!"
              closable={true}
              closingAlert={atCloseSuccessMessage}
            />
          )}
      {status === 'loading' && <Loader />}
      {status !== 'loading' && <EditProfileForm transferData={editProfile} email={email} username={username} errorMessage={error} />}
    </>
  )
}

export default Profile
