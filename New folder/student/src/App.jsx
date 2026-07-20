import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import Signup from './components/Signup'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom' 
import Admin from './components/admin'
function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      {/* <Dashboard /> */}
    </Router>
  )
}

export default App
