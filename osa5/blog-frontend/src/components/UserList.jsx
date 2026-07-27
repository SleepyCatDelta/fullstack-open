import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const UserList = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    axios.get('/api/users').then((res) => setUsers(res.data))
  }, [])

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td><Link to={`/users/${u.id}`}>{u.name}</Link></td>
              <td>{u.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserList