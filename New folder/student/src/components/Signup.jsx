import React, { useState } from 'react';
import axios from 'axios';

function Signup() {
  const [student, setStudent] = useState({
    email: '',
    password: '',
    name: '',
    roll: ''
  });
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);

    try {
      const payload = {
        ...student,
        roll: Number(student.roll)
      };

      const response = await axios.post(
        'https://5w7yq4tjoa.execute-api.eu-north-1.amazonaws.com/register',
        payload,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      setMessage(response.data?.message || 'Signup successful');
      setStudent({ email: '', password: '', name: '', roll: '' });
    } catch (error) {
      console.error('Signup error:', error);
      const backendMessage = error.response?.data?.error || error.message || 'Signup failed';
      setIsError(true);
      setMessage(backendMessage);
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={student.email}
          onChange={handleChange}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={student.password}
          onChange={handleChange}
        />

        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={student.name}
          onChange={handleChange}
        />

        <label htmlFor="roll">Roll:</label>
        <input
          type="number"
          id="roll"
          name="roll"
          value={student.roll}
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
      </form>

      {message && (
        <p style={{ color: isError ? 'crimson' : 'green', marginTop: '12px' }}>
          {message}
        </p>
      )}
    </div>
  );
}

export default Signup;
