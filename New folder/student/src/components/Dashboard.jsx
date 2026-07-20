import React from 'react'

import { Link } from 'react-router-dom'
function Dashboard() {
  return (
    <>
    <div>Dashboard
        <div><Link to="/login">Login</Link></div>
        <div><Link to="/signup">Register</Link></div>
    </div>
    </>
    
  )
}

export default Dashboard
