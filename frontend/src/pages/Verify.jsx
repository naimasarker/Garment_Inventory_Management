import React, { useState } from 'react';
import { verifyMail } from '../services/authServices';

function Verify() {
    const [form, setForm] = useState({ email: '', otp: '' });
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await verifyMail(form);
            if (res.data && res.data.status === 'success') {
                setMessage('Verification successful! You can now log in.');
                setSuccess(true);
            } else {
                setMessage('Verification failed. Please try again.');
                setSuccess(false);
            }
        } catch (err) {
            setMessage('Verification failed. Please try again.');
            setSuccess(false);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Email Verification</h2>
            {message && (
                <div className={`alert ${success ? 'alert-success' : 'alert-danger'}`}>
                    {message}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label>OTP</label>
                    <input
                        type="text"
                        name="otp"
                        className="form-control"
                        value={form.otp}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button className="btn btn-primary" type="submit">
                    Verify
                </button>
            </form>
        </div>
    );
}

export default Verify;