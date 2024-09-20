import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./index.css"
import { BrowserRouter } from 'react-router-dom'
import { AppLayout } from './layouts/AppLayout.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppLayout>
        <App />
      </AppLayout>
    </BrowserRouter>
  </React.StrictMode>,
)
