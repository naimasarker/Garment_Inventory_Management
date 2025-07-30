import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Garment Inventory</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link className="nav-link" to="/">Dashboard</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/products">Products</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/categories">Categories</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/purchase-orders">Purchase Orders</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/stock-transactions">Stock Transactions</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/users">Users</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;