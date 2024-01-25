import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Main from './pages/Main/Main'
import Login from './pages/login/Login'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLoggedIn = () => {
    setIsLoggedIn(true)
  }

  return <div>
    {
      isLoggedIn ? <Main/> : <Login onLoggedIn={handleLoggedIn}/>
    }
  </div>
}

export default App
