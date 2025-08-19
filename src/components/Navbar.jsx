import React, { useContext } from "react";
import logo from "../assets/logo.png";
import arrow from "../assets/arrow_icon.png";
import { CoinContext } from "../context/CoinContext";
import { Link } from "react-router-dom";

function Navbar() {
  const { setCurrency } = useContext(CoinContext);
  // when i select usd it will provide usd data, will select inr it will provide inr data
  const currencyHandler = (event) => {
    switch (event.target.value) {
      case "usd": {
        setCurrency({ name: "usd", symbol: "$" });
        break;
      }
      case "inr": {
        setCurrency({ name: "inr", symbol: "₹" });
        break;
      }
      case "eur": {
        setCurrency({ name: "eur", symbol: "€" });
        break;
      }
      default: {
        setCurrency({ name: "usd", symbol: "$" });
        break;
      }
    }
  };
  return (
    <div className="flex items-center justify-between px-[10%] py-[20px] text-[#ddd] border-b-2 border-b-[#3c3c3c] max-[900px]:px-[8%] max-[768px]:px-[5%] max-[768px]:py-[15px]">
      <Link to={"/"}>
        <img src={logo} className="w-[max(12vw,120px)]" />
      </Link>
      <ul className="flex gap-[40px] cursor-pointer max-[900px]:hidden">
        <Link to={"/"}>
          <li>Home</li>
        </Link>
        <li>Features</li>
        <li>Pricing</li>
        <li>Blog</li>
      </ul>
      <div className="flex items-center gap-[max(1vw,12px)] max-[768px]:gap-[10px] ">
        <select
          onChange={currencyHandler}
          className="px-[8px] py-[3px] rounded border-2 border-white bg-transparent text-white  max-[768px]:px-[6px] max-[768px]:py-[2px]"
        >
          <option className="bg-[#09005c] text-white" value="usd">
            USD
          </option>
          <option className="bg-[#09005c] text-white" value="eur">
            EUR
          </option>
          <option className="bg-[#09005c] text-white" value="inr">
            INR
          </option>
        </select>
        <button className="flex items-center gap-[10px] px-[25px] py-[10px] rounded-3xl text-[16px] text-[#393939] bg-white border-0 cursor-pointer max-[900px]:gap-[8px] max-[900px]:px-[18px] max-[900px]:py-[8px] max-[900px]:text-[14px]  max-[768px]:px-[15px] max-[768px]:py-[6px] ">
          Sign Up{" "}
          <img
            src={arrow}
            className="w-[13px] max-[768px]:w-[12px] max-[500px]:w-[10px]"
          />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
