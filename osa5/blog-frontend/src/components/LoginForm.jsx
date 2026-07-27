import { useState } from 'react'

const LoginForm = ({ handleLogin, message }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = (event) => {
    event.preventDefault()
    handleLogin({ username, password })
  }

  return (
    <div>
      <h2>log in to application</h2>
      {message && <p style={{ color: message.type === 'error' ? 'red' : 'green' }}>{message.text}</p>}
      <form onSubmit={onSubmit}>
        <div>
          username
          <input type="text" value={username} onChange={({ target }) => setUsername(target.value)} id="username" />
        </div>
        <div>
          password
          <input type="password" value={password} onChange={({ target }) => setPassword(target.value)} id="password" />
        </div>
        <button type="submit" id="login-button">login</button>
      </form>
    </div>
  )
}

export default LoginForm
