import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {AuthProvider} from './contexts/AuthContext.tsx'
import { GeneralProvider } from './contexts/GeneralContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <GeneralProvider>
        <App />
      </GeneralProvider>
    </AuthProvider>
  </React.StrictMode>,
)
