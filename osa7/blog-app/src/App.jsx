import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import useUserStore from './stores/userStore'
import NavBar from './components/NavBar'
import LoginForm from './components/LoginForm'
import ErrorBoundary from './components/ErrorBoundary'
import Home from './pages/Home'
import Users from './pages/Users'
import User from './pages/User'
import BlogPage from './pages/BlogPage'
import NotFound from './pages/NotFound'

const App = () => {
  const user = useUserStore((state) => state.user)
  const initializeUser = useUserStore((state) => state.initializeUser)

  useEffect(() => {
    initializeUser()
  }, [initializeUser])

  if (!user) {
    return <LoginForm />
  }

  return (
    <div>
      <NavBar />
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/blogs/:id" element={<BlogPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
    </div>
  )
}

export default App
