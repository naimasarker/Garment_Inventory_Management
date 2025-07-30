import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Products from './pages/Products.jsx';
import Categories from './pages/Categories.jsx';
import PurchaseOrders from './pages/PurchaseOrders.jsx';
import StockTransactions from './pages/StockTransactions.jsx';
import Users from './pages/Users.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import Verify from './pages/Verify.jsx';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/purchase-orders" element={<PurchaseOrders />} />
          <Route path="/stock-transactions" element={<StockTransactions />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;