import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ProductsPage from "./pages/ProductsPage";
import StockPage from "./pages/StockPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/stock" element={<StockPage />} />
    </Routes>
  </Router>
);
