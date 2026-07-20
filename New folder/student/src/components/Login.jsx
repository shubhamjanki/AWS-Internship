import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [login, setLogin] = useState({
        email: '',
        password: ''
    });
    const [message, setMessage] = useState('');
    const handleChange = (e) => {
        setLogin({
            ...login,
            [e.target.name]: e.target.value
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://5w7yq4tjoa.execute-api.eu-north-1.amazonaws.com/login', login);
            console.log('Login success:', response.data);
            setMessage(response.data?.message || 'Login successful');
            navigate('/admin'); // Redirect to dashboard on successful login
            
            
        } catch (error) {
            console.error('Error logging in:', error.response?.data || error.message);
        }
    };

  return (
    <div>Login
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={login.email} onChange={handleChange} />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={login.password} onChange={handleChange} />
        <button type="submit" onClick={handleLogin}>
          Login
        </button>
        {message && <p>{message}</p>}
    </div>
  )
}

export default Login