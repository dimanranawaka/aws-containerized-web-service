import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await axios.get(`${window.location.origin}/api/prices`);
        setCoins(response.data);
      } catch (error) {
        console.error("Error fetching data from backend", error);
      }
    };

    fetchPrices();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center">
      {/* Header */}
      <header className="w-full flex justify-center py-6 bg-black">
        <img
          src="/Coinbase_Wordmark.png"
          alt="Coinbase Logo"
          className="h-12 w-auto"
        />
      </header>

      {/* Main Content */}
      <main className="w-full max-w-5xl px-4 py-8 mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          Cryptocurrency Prices by Market Cap
        </h1>
        {/* Scrollable table */}
        <div className="overflow-y-scroll h-96 w-full max-w-5xl bg-gray-800 rounded-lg shadow-md border border-gray-700">
          <table className="table-auto w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-4 py-2 text-center text-sm font-semibold">
                  Rank
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold">
                  Name
                </th>
                <th className="px-4 py-2 text-center text-sm font-semibold">
                  Price (USD)
                </th>
                <th className="px-4 py-2 text-center text-sm font-semibold">
                  Market Cap
                </th>
                <th className="px-4 py-2 text-center text-sm font-semibold">
                  24h Change
                </th>
              </tr>
            </thead>
            <tbody>
              {coins.map((coin) => (
                <tr key={coin.id} className="hover:bg-gray-600">
                  <td className="px-3 py-2 text-center">
                    {coin.market_cap_rank}
                  </td>
                  <td className="px-3 py-2 flex items-center">
                    <img
                      src={coin.image}
                      alt={coin.name}
                      className="mr-2"
                      style={{ width: "25px", height: "25px" }}
                    />
                    <span>
                      {coin.name} ({coin.symbol.toUpperCase()})
                    </span>
                  </td>
                  <td className="px-3 py-2 text-center">
                    ${coin.current_price.toLocaleString()}
                  </td>
                  <td className="px-3 py-2 text-center">
                    ${coin.market_cap.toLocaleString()}
                  </td>
                  <td
                    className={`px-3 py-2 text-center ${
                      coin.price_change_percentage_24h >= 0
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-4 bg-black text-center flex flex-col items-center">
        {/* Custom DREED logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontFamily: "Arial, sans-serif",
            fontWeight: "bold",
            fontSize: "clamp(24px, 5vw, 48px)",
            letterSpacing: "0.1em",
          }}
        >
          <span
            style={{
              color: "red",
              backgroundColor: "black",
              padding: "0 1vw",
              borderRadius: "4px",
              marginRight: "0.2em",
            }}
          >
            D
          </span>
          <span
            style={{
              color: "white",
              backgroundColor: "black",
              padding: "0 1vw",
              borderRadius: "4px",
            }}
          >
            REED
          </span>
        </div>
        <p className="text-gray-400 text-sm mt-2">
          &copy; 2024 Diman Ranawaka. All Rights Reserved
        </p>
      </footer>
    </div>
  );
}

export default App;
