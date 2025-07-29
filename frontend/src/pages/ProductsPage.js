import React, { useEffect, useState } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Product Management</h2>
      <ul className="space-y-2">
        {products.map((product) => (
          <li key={product.id} className="border p-2 rounded-xl">
            {product.name} - {product.category}
          </li>
        ))}
      </ul>
    </div>
  );
}
