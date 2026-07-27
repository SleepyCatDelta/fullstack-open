import useField from '../hooks/useField'
import useUserStore from '../stores/userStore'
import Notification from './Notification'

const LoginForm = () => {
  const username = useField('text')
  const password = useField('password')
  const login = useUserStore((state) => state.login)

  const handleSubmit = (event) => {
    event.preventDefault()
    login({ username: username.value, password: password.value })
  }

  return (
    <div>
      <h2>log in to application</h2>
      <Notification />
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input {...username} id="username" />
        </div>
        <div>
          password
          <input {...password} id="password" />
        </div>
        <button type="submit" id="login-button">login</button>
      </form>
    </div>
  )
}

export default LoginForm
