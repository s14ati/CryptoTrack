import React, { useContext, useEffect, useState } from "react";
import { CoinContext } from "../context/CoinContext";
import { Link } from "react-router-dom";

function Home() {
  <Link></Link>
  const { allCoin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  // state that store the data that will type in search box
  const [input, setInput] = useState("");

  function inputHandler(event) {
    setInput(event.target.value);
    //jb search box empty krde tb wapas se sare coins show hone lage
    if (event.target.value === "") {
      setDisplayCoin(allCoin);
    }

    // console.log("value is : ",event.target.value)
  }
  // console.log("input is : " ,input);

  // filter result in the table
  async function searchHandler(event) {
    // jb hum input dege or search krege tb page reload hoga, usse bachne k liye
    event.preventDefault();

    // isme kya ho rha h : jb hum kuch input m de rhe h wo data input variable m store ho rha h
    // hame allCoin data mil rha h uspr humne filter lgaya h ki jo input m di h value wo match ho to unko filter krkr de do
    const coins = await allCoin.filter((item) => {
      return item.name.toLowerCase().includes(input.toLowerCase());
    });
    // filter krne k baad hame wo sara data table m chahiye jo coins naam k varible m aa rha h
    setDisplayCoin(coins);
  }
  // console.log(allCoin);

  //when allCoin chnges useeffect function will execute
  //humne bs data ki copy banai h, jo data allCoin m ayega UseContext k through- wo humne copy kr diya h displayCoin k andr
  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin]);

  return (
    <div className="px-[10px] py-0 pb-[100px]">
      {/* Hero Section */}
      <div className="max-w-[600px] mx-auto my-[80px] flex flex-col items-center text-center gap-[30px] px-4">
        <h1 className="text-[max(4vw,36px)] font-semibold leading-tight">
          Largest <br /> Crypto Marketplace
        </h1>
        <p className="w-[75%] text-[#e3e3e3] leading-normal text-sm sm:text-base">
          Welcome to the world's largest cryptocurrency marketplace. Sign up to
          explore about cryptos
        </p>
        <form
          onSubmit={searchHandler}
          className="p-[8px] w-[80%] bg-white rounded text-[20px] flex justify-between items-center gap-[10px] text-black"
        >
          <input
            onChange={inputHandler}
            required
            value={input}
            list="coinlist"
            className="flex-1 text-[16px] outline-0 border-0 pl-[10px] placeholder:font-semibold min-w-[100px] sm:min-w-[150px]"
            type="text"
            placeholder="Search Crypto..."
          />
          {/* for input suggestions */}
          <datalist id="coinlist">
            {allCoin.map((item, idx) => (
              <option key={idx} value={item.name} />
            ))}
          </datalist>
          <button
            className="border-0 bg-[#7927ff] text-white text-[14px] sm:text-[16px] px-[20px] sm:px-[30px] py-[8px] sm:py-[10px] rounded cursor-pointer"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>

      {/* Table Layout */}
      <div className="max-w-[800px] m-auto rounded bg-[linear-gradient(rgba(84,3,255,0.15),rgba(105,2,153,0.15))]">
        {/* Table Header */}
        <div
          className="
      grid grid-cols-[0.5fr_2fr_1fr_1fr] sm:grid-cols-[0.5fr_2fr_1fr_1fr_1.5fr] 
      px-3 sm:px-5 py-3 sm:py-4 items-center border-b-2 border-b-[#3c3c3c]
      text-xs sm:text-sm md:text-base
    "
        >
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p className="text-center">24H</p>
          <p className="text-right hidden sm:block">Market Cap</p>
        </div>

        {/* Table Rows */}
        {displayCoin.slice(0, 15).map((itm, idx) => (
          <Link to={`/coin/${itm.id}`}
            key={idx}
            className="grid grid-cols-[0.5fr_2fr_1fr_1fr] sm:grid-cols-[0.5fr_2fr_1fr_1fr_1.5fr] px-3 sm:px-5 py-3 sm:py-4 items-center border-b-2 border-b-[#3c3c3c] last:border-b-0 text-xs sm:text-sm md:text-base"
          >
            <p>{itm.market_cap_rank}</p>

            {/* Coin Info */}
            <div className="flex items-center gap-2 sm:gap-3">
              <img className="w-6 sm:w-8" src={itm.image} alt={itm.name} />
              <p className="truncate">
                {window.innerWidth < 640 ? itm.name.slice(0, 5) : itm.name} -{" "}
                {itm.symbol}
              </p>
            </div>

            {/* Price */}
            <p>
              {currency.symbol} {itm.current_price.toLocaleString()}
            </p>

            {/* Change */}
            <p
              className={`text-center ${
                itm.price_change_percentage_24h > 0
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              {Math.floor(itm.price_change_percentage_24h * 100) / 100}%
            </p>

            {/* Market Cap → hidden on mobile */}
            <p className="text-right hidden sm:block">
              {currency.symbol}
              {itm.market_cap.toLocaleString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
