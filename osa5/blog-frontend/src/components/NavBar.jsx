import { Link } from 'react-router-dom'

const NavBar = ({ user, handleLogout }) => {
  if (!user) return null

  return (
    <nav>
      <Link to="/">blogs</Link>
      &nbsp;
      <Link to="/users">users</Link>
      &nbsp;
      {user.name} logged-in
      <button onClick={handleLogout}>logout</button>
    </nav>
  )
}

export default NavBar