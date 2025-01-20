import React, { useState } from 'react'
import { TutorRoutes } from '../routes/TutorRoutes';

export const LoginTutorPage = () => {const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [logged, setLogged] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      setLogged(true);
      // alert('Login exitoso!');
    } else {
      alert('Usuario o contraseña incorrectos.');
    }
  };

  return (
    <div >

      
      {!logged ? (
        <form className='card mt-5 py-3 col-md-6 mx-auto' onSubmit={handleLogin}>
          <h2 className='text-center'>Login</h2>

          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="username" style={{ display: 'block', marginBottom: '5px' }}>
              Username:
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            />
          </div>
          <button
            type="submit"
            style={{
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              padding: '10px 15px',
              cursor: 'pointer',
              borderRadius: '5px',
            }}
          >
            Login
          </button>
        </form>

      ) : (
          <TutorRoutes/>         
      )}
    </div>
  );
}
