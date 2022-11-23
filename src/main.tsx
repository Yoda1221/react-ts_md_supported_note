import App from './App'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"

import "bootstrap/dist/css/bootstrap.min.css"

createRoot(document.getElementById('root') as HTMLElement)
.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
