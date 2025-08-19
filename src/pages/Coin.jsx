import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CoinContext } from "../context/CoinContext";
import LineChart from "../components/LineChart";

function Coin() {
  // parameters m jo ayegi coin ki id uska data nikal kr de diya h
  const { coinId } = useParams();
  // stores the coin data from API
  const [coinData, setCoinData] = useState();
  //historical data
  const [historicalData, setHistoricalData] = useState();
  const { currency } = useContext(CoinContext);

  const fetchCoinData = async () => {
    const options = { method: "GET", headers: { accept: "application/json" } };

    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then((res) => res.json())
      .then((res) => setCoinData(res))
      .catch((err) => console.error(err));
  };

  const fetchHistoricalData = () => {
    const options = { method: "GET", headers: { accept: "application/json" } };

    fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=12&interval=daily`,
      options
    )
      .then((res) => res.json())
      .then((res) => setHistoricalData(res))
      .catch((err) => console.error(err));
  };

  //when currency changes fetcCoinData() function will execute
  useEffect(() => {
    fetchCoinData();
    fetchHistoricalData();
  }, [currency,coinId]);

  return (
    <>
      {coinData && historicalData ? (
        <div className="overflow-x-hidden px-[20px] py-0">
          <div className="flex flex-col items-center gap-[20px] mx-auto my-[100px] mb-[50px]">
            <img src={coinData.image.large} className="max-w-[100px]" />
            <p>
              <b className="text-[44px] font-semibold">
                {coinData.name} ({coinData.symbol.toUpperCase()})
              </b>
            </p>
          </div>
          <div className="max-w-[600px] h-[250px] m-auto">
            <LineChart historicalData={historicalData} />
          </div>

          <div className="max-w-[600px] mx-auto my-[50px] flex flex-col     ">
            <ul className="flex justify-between px-[0px] py-[10px] list-none border-b border-[#5f5d5f]">
              <li>Crypto Market Rank</li>
              <li className="last:font-light">{coinData.market_cap_rank}</li>
            </ul>
            <ul className="flex justify-between px-[0px] py-[10px] list-none border-b border-[#5f5d5f]">
              <li>Current Price</li>
              <li className="last:font-light">{currency.symbol} {coinData.market_data.current_price[currency.name].toLocaleString()}</li>
            </ul>
            <ul className="flex justify-between px-[0px] py-[10px] list-none border-b border-[#5f5d5f]">
              <li>Market Cap</li>
              <li className="last:font-light">{currency.symbol} {coinData.market_data.market_cap[currency.name].toLocaleString()}</li>
            </ul>
            <ul className="flex justify-between px-[0px] py-[10px] list-none border-b border-[#5f5d5f]">
              <li>24 Hour high</li>
              <li className="last:font-light">{currency.symbol} {coinData.market_data.high_24h[currency.name].toLocaleString()}</li>
            </ul>
            <ul className="flex justify-between px-[0px] py-[10px] list-none border-b border-[#5f5d5f]">
              <li>24 Hour low</li>
              <li className="last:font-light">{currency.symbol} {coinData.market_data.low_24h[currency.name].toLocaleString()}</li>
            </ul>

          </div>

        </div>
      ) : (
        <div className="grid place-items-center min-h-[80vh]">
          <div className="w-[65px] h-[65px] border-[5px] border-solid border-[#bdbdbd] border-t-[#4500c6] rounded-full animate-spin"></div>
        </div>
      )}
    </>
  );
}

export default Coin;
