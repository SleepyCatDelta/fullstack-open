import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    clearNotification() {
      return null
    },
  },
})

export const { setNotification, clearNotification } = notificationSlice.actions

export const showNotification = (text, timeout = 5) => {
  return async (dispatch) => {
    dispatch(setNotification(text))
    setTimeout(() => dispatch(clearNotification()), timeout * 1000)
  }
}

export default notificationSlice.reducer
