import React, { useState } from 'react';
import { loginUser } from '../services/authServices';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { setToken } = useContext(AuthContext);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await loginUser(form);
      if (res.data && res.data.status === 'success') {
        setToken(res.data.token);
        setMessage('Login successful!');
        setTimeout(() => navigate('/'), 1000);
      } else {
        setMessage(res.data?.error || 'Login failed');
      }
    } catch (err) {
      if (err.response?.data?.error === 'Account is deactivated!') {
        setMessage('Your account is deactivated. Please contact your manager or admin.');
      } else if (err.response?.data?.error) {
        setMessage(err.response.data.error);
      } else {
        setMessage('Login failed');
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2>Login</h2>
      {message && (
        <div className={`alert ${message === 'Login successful!' ? 'alert-success' : 'alert-danger'}`}>
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" name="email" className="form-control" value={form.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" name="password" className="form-control" value={form.password} onChange={handleChange} required />
        </div>
        <button className="btn btn-primary" type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;