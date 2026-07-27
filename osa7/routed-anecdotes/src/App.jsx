import { useState } from 'react'
import { Routes, Route, Link, useParams, useNavigate } from 'react-router-dom'

const Menu = () => {
  const padding = { paddingRight: 5 }
  return (
    <div>
      <Link to="/" style={padding}>anecdotes</Link>
      <Link to="/create" style={padding}>create new</Link>
      <Link to="/about" style={padding}>about</Link>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote =>
        <li key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      )}
    </ul>
  </div>
)

const Anecdote = ({ anecdotes }) => {
  const { id } = useParams()
  const anecdote = anecdotes.find(a => a.id === Number(id))
  if (!anecdote) return null
  return (
    <div>
      <h2>{anecdote.content}</h2>
      <p>has {anecdote.votes} votes</p>
    </div>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>
    <p>An anecdote is a brief, revealing account of an individual person or an incident.</p>
    <p>Often humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself.</p>
  </div>
)

const Footer = () => (
  <div>
    <p>Anecdote app for <a href="https://fullstackopen.com/">Full Stack Open</a>.</p>
  </div>
)

const CreateNew = ({ addNew, notification }) => {
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    addNew({ content, author, info, votes: 0 })
    navigate('/')
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      {notification}
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name="content" value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <div>
          author
          <input name="author" value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div>
          url for more info
          <input name="info" value={info} onChange={(e) => setInfo(e.target.value)} />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    { content: 'If it hurts do it more often', id: 1, votes: 0 },
    { content: 'Adding manpower to a late project makes it later', id: 2, votes: 0 },
    { content: 'The first 90 percent of the code accounts for the first 90 percent of the development time...', id: 3, votes: 0 },
    { content: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand', id: 4, votes: 0 },
    { content: 'Premature optimization is the root of all evil', id: 5, votes: 0 },
    { content: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it', id: 6, votes: 0 },
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`a new anecdote '${anecdote.content}' created`)
    setTimeout(() => setNotification(''), 5000)
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/anecdotes/:id" element={<Anecdote anecdotes={anecdotes} />} />
        <Route path="/about" element={<About />} />
        <Route path="/create" element={<CreateNew addNew={addNew} notification={notification} />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App