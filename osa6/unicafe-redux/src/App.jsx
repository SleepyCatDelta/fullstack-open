import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  const state = useSelector(state => state)

  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={() => dispatch({ type: 'GOOD' })}>good</button>
      <button onClick={() => dispatch({ type: 'OK' })}>ok</button>
      <button onClick={() => dispatch({ type: 'BAD' })}>bad</button>
      <button onClick={() => dispatch({ type: 'ZERO' })}>reset stats</button>
      <h2>statistics</h2>
      <p>good {state.good}</p>
      <p>ok {state.ok}</p>
      <p>bad {state.bad}</p>
    </div>
  )
}

export default App
