const KEY = 'loggedBlogUser'

const getUser = () => {
  const raw = window.localStorage.getItem(KEY)
  if (!raw) return null
  return JSON.parse(raw)
}

const saveUser = (user) => {
  window.localStorage.setItem(KEY, JSON.stringify(user))
}

const removeUser = () => {
  window.localStorage.removeItem(KEY)
}

export default { getUser, saveUser, removeUser }
