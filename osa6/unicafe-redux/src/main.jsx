import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './reducers/reducer'
import App from './App.jsx'

const store = configureStore({ reducer: counterReducer })

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
