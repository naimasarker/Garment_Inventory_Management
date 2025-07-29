import React, { useEffect, useState } from "react";

export default function StockPage() {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/stocks")
      .then((res) => res.json())
      .then((data) => setStocks(data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Stock System</h2>
      <ul className="space-y-2">
        {stocks.map((stock) => (
          <li key={stock.id} className="border p-2 rounded-xl">
            {stock.productName} - {stock.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}
