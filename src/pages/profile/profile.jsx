/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { fetchUserUpdate, errorNull } from '../../redux/user'
import EditProfileForm from '../../components/edit-profile-form/edit-profile-form'
import Loader from '../../components/UI/loader/loader'

const Profile = () => {
  const dispatch = useDispatch()
  const { error, status, errorData } = useSelector((state) => state.user)
  // const navigate = useNavigate()

  // useEffect(() => {
  //   if (status === 'resolved' && !error) {
  //     navigate('/articles')
  //     return () => dispatch(errorNull())
  //   }
  // }, [error, dispatch, status])
  const handleEditProfile = (val, userData) => {
    const newUser = { ...userData }
    for (const prop in val) {
      if (val[prop] !== '' && val[prop] !== undefined) {
        newUser[prop] = val[prop]
      }
    }
    dispatch(fetchUserUpdate({ newUser, userData }))
  }

  return (
    <>
      {status === 'loading' && <Loader />}
      {status !== 'loading' && (
        <EditProfileForm
          onEditUserData={handleEditProfile}
          errorData={errorData}
          errorMessage={error}
          onErrorNull={errorNull}
        />
      )}
    </>
  )
}

export default Profile
