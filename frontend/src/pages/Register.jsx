import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authServices';

function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phn_no: '',
    password: '',
    role: 'staff'
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await registerUser(form);
      if (res.data) {
        setMessage(res.data.message || 'Registration successful! Please check your email for verification.');
        setTimeout(() => navigate('/verify'), 1500);
      }
    } catch (err) {
      setMessage(
        err.response?.data?.message ||
        err.response?.data?.error ||
        'Registration failed'
      );
    }
  };

  return (
    <div className="container mt-4">
      <h2>Register</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name</label>
          <input type="text" name="name" className="form-control" value={form.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" name="email" className="form-control" value={form.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Phone Number</label>
          <input type="text" name="phn_no" className="form-control" value={form.phn_no} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" name="password" className="form-control" value={form.password} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Role</label>
          <select name="role" className="form-control" value={form.role} onChange={handleChange} required>
            <option value="staff">Staff</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button className="btn btn-primary" type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;