import { Link } from 'react-router-dom'
import useUserStore from '../stores/userStore'

const NavBar = () => {
  const user = useUserStore((state) => state.user)
  const logout = useUserStore((state) => state.logout)

  if (!user) return null

  return (
    <nav>
      <Link to="/">blogs</Link>
      &nbsp;
      <Link to="/users">users</Link>
      &nbsp;
      {user.name} logged-in
      <button onClick={logout}>logout</button>
    </nav>
  )
}

export default NavBar
