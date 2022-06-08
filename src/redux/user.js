/* eslint-disable */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const baseStr = 'https://kata.academy:8021/api'

export const fetchUserRegistration = createAsyncThunk(
  'user/fetchUserRegistration',
  async function (newUser, { rejectWithValue }) {
    const url = new URL(`${baseStr}/users`)
    try {
      const body = {
        user: newUser,
      }
      const headers = {
        'Content-Type': 'application/json;charset=utf-8',
      }
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers,
      })

      return response.json()
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchUserLogIn = createAsyncThunk('user/fetchUserLogIn', async function (newUser, { rejectWithValue }) {
  const url = new URL(`${baseStr}/users/login`)
  try {
    const body = {
      user: newUser,
    }
    const headers = {
      'Content-Type': 'application/json;charset=utf-8',
    }
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers,
    })

    return response.json()
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const fetchUserUpdate = createAsyncThunk(
  'user/fetchUserUpdate',
  async function ({ newUser, userData }, { rejectWithValue }) {
    
    const { token } = userData || ''
    const url = new URL(`${baseStr}/user`)
    try {
      const body = {
        user: newUser,
      }
      const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      })

      return response.json()
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: null,
    status: null,
    error: null,
    bio: null,
  },

  reducers: {
    logOutUser(state) {
      state.userData = null
      state.status = null
      state.error = null
    },

    errorNull(state) {
      state.error = null
    },
  },

  extraReducers: {
    [fetchUserRegistration.pending]: (state) => {
      state.status = 'loading'
      state.error = null
    },
    [fetchUserRegistration.fulfilled]: (state, action) => {
      if (action.payload.user) {
        state.status = 'resolved'
        state.userData = action.payload.user
        return
      }
      if (action.payload.errors) {
        state.status = 'rejected'
        let errStr = ''

        if (action.payload.errors.error) {
          errStr += action.payload.errors.error.status
        } else {
          const errArr = Object.entries(action.payload.errors)
          errArr.forEach((item) => {
            errStr += `${item[0]}: ${item[1]} `
          })
        }
        state.error = errStr
      }
    },
    [fetchUserRegistration.rejected]: (state, action) => {
      state.status = 'rejected'
      state.error = action.payload
    },

    [fetchUserLogIn.pending]: (state) => {
      state.status = 'loading'
      state.error = null
    },
    [fetchUserLogIn.fulfilled]: (state, action) => {
      if (action.payload.user) {
        state.status = 'resolved'
        state.userData = action.payload.user
        return
      }
      if (action.payload.errors) {
        state.status = 'rejected'

        let errStr = ''

        if (action.payload.errors.error) {
          errStr += action.payload.errors.error.status
        } else {
          const errArr = Object.entries(action.payload.errors)
          errStr = `${errArr[0][0]}: ${errArr[0][1]}`
        }
        state.error = errStr
      }
    },
    [fetchUserLogIn.rejected]: (state, action) => {
      state.status = 'rejected'
      state.error = action.payload
    },

    [fetchUserUpdate.pending]: (state) => {
      state.status = 'loading'
      state.error = null
    },
    [fetchUserUpdate.fulfilled]: (state, action) => {
      if (action.payload.user) {
        state.status = 'resolved'
        state.userData = action.payload.user
        return
      }
      if (action.payload.errors) {
        state.status = 'rejected'

        let errStr = ''

        if (action.payload.errors.error) {
          errStr += action.payload.errors.error.status
        } else {
          const errArr = Object.entries(action.payload.errors)
          errArr.forEach((item) => {
            errStr += `${item[0]}: ${item[1]} `
          })
        }
        state.error = errStr
      }
    },
    [fetchUserUpdate.rejected]: (state, action) => {
      state.status = 'rejected'
      state.error = action.payload
    },
  },
})

export const { logOutUser, errorNull } = userSlice.actions

export default userSlice.reducer
