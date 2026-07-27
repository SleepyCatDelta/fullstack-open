import { create } from 'zustand'
import loginService from '../services/login'
import blogService from '../services/blogs'
import persistentUser from '../services/persistentUser'
import useNotificationStore from './notificationStore'

const useUserStore = create((set) => ({
  user: null,

  initializeUser: () => {
    const saved = persistentUser.getUser()
    if (saved) {
      set({ user: saved })
      blogService.setToken(saved.token)
    }
  },

  login: async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      persistentUser.saveUser(user)
      blogService.setToken(user.token)
      set({ user })
    } catch {
      useNotificationStore.getState().notify('Wrong credentials', 'error')
    }
  },

  logout: () => {
    persistentUser.removeUser()
    set({ user: null })
  },
}))

export default useUserStore
