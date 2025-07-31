import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../services/authServices';
import { AuthContext } from '../context/AuthContext';
import '../assets/css/Navbar.css'; 

function Navbar() {
  const navigate = useNavigate();
  const { token, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.error('Logout failed:', err);
    }
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Garment Inventory</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto nav-links">
            {!token ? (
              <div className="auth-buttons">
                <li className="nav-item">
                  <Link className="btn btn-success me-2" to="/register">Signup</Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-light" to="/login">Login</Link>
                </li>
              </div>
            ) : (
              <div className="nav-links">
                <li className="nav-item"><Link className="nav-link" to="/">Dashboard</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/products">Products</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/categories">Categories</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/purchase-orders">Purchase Orders</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/stock-transactions">Stock Transactions</Link></li>
                <li className="nav-item">
                  <button className="btn btn-danger ms-2" onClick={handleLogout}>Logout</button>
                </li>
              </div>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;