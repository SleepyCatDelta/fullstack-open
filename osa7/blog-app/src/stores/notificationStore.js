import { create } from 'zustand'

const useNotificationStore = create((set) => ({
  message: null,

  setNotification: (text, type = 'success') => {
    set({ message: { text, type } })
  },

  clearNotification: () => {
    set({ message: null })
  },

  notify: (text, type = 'success') => {
    set({ message: { text, type } })
    setTimeout(() => {
      set({ message: null })
    }, 5000)
  },
}))

export default useNotificationStore
