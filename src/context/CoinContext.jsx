/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useEffect, useState } from "react";

export const CoinContext = createContext();
// console.log(CoinContext);

const CoinContextProvider = (props) => {
  const [allCoin, setAllCoin] = useState([]);
  const [currency, setCurrency] = useState({
    name: "usd",
    symbol: "$",
  });

  const fetchAllCoin = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": import.meta.env.VITE_CG_API_KEY,
      },
    };

    fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`,
      options
    )
      .then((res) => res.json())
      .then((res) => setAllCoin(res))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchAllCoin();

    //jb bhi currecncy update hogi tb tb useEffect hook chal jayega
  }, [currency]);

  // now we can pass this contextValue in any component so that every compoent can acces values of allcoins,currecncy and setCurrency
  const contextValue = { allCoin, currency, setCurrency };

  return (
    <CoinContext.Provider value={contextValue}>
      {props.children}
    </CoinContext.Provider>
  );
};

export default CoinContextProvider;
