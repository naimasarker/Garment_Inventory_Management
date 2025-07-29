import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="min-h-screen p-10 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Garment Inventory Dashboard</h1>
      <div className="space-y-4">
        <Link to="/products" className="block text-blue-600 underline">
          Go to Product Management
        </Link>
        <Link to="/stock" className="block text-blue-600 underline">
          Go to Stock System
        </Link>
      </div>
    </div>
  );
}
