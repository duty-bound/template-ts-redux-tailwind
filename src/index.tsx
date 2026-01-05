import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store'
import './index.css'
import { App } from './components/App'

const container = document.getElementById('mountNode')

const root = createRoot(container as HTMLElement)

root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
