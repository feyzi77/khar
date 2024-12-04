import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [tokens, setTokens] = useState(0); // تعداد توکن‌های کاربر
  const [miningSpeed, setMiningSpeed] = useState(0); // سرعت ماین

  useEffect(() => {
    const interval = setInterval(() => {
      setTokens((prevTokens) => prevTokens + miningSpeed / 24);
    }, 3600000);
    return () => clearInterval(interval);
  }, [miningSpeed]);

  const handleBoost = async () => {
    const tonkeeperLink = `https://tonkeeper.com/transfer/UQBGPcjpLyLOkCjdMt2mw-f1adTJZZTV4AOwM90edhSRjjN3?amount=100000000000`;
    window.open(tonkeeperLink, "_blank");
    setMiningSpeed(150);
  };

  const handleWithdraw = async () => {
    try {
      await axios.post("https://your-backend-url/withdraw", { tokens });
      setTokens(0);
      alert("برداشت با موفقیت انجام شد!");
    } catch (error) {
      console.error("خطا در برداشت:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4">ماینر توکن همستر</h1>
        <p className="text-lg mb-2">تعداد توکن‌های شما: <span className="font-bold">{tokens.toFixed(2)}</span></p>
        <p className="text-lg mb-4">سرعت ماین: <span className="font-bold">{miningSpeed} توکن/روز</span></p>
        <div className="flex gap-4">
          <button
            onClick={handleBoost}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            بوست
          </button>
          <button
            onClick={handleWithdraw}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            برداشت
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
