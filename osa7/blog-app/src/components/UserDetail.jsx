import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

const UserDetail = () => {
  const { id } = useParams()
  const [user, setUser] = useState(null)

  useEffect(() => {
    axios.get('/api/users').then((res) => {
      const found = res.data.find((u) => u.id === id)
      setUser(found)
    })
  }, [id])

  if (!user) return null

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((b) => (
          <li key={b.id}>
            <Link to={`/blogs/${b.id}`}>{b.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserDetail
