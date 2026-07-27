import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      {notification && <div style={{ border: '1px solid green', padding: '5px' }}>{notification}</div>}
      <AnecdoteForm />
      <AnecdoteList />
    </div>
  )
}

export default App
