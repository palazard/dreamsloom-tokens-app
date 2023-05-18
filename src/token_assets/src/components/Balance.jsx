import React, {useState} from "react";
import {token} from "../../../declarations/token";
import {Principal} from "@dfinity/principal";

function Balance() {

  const [inputValue, setInput] = useState("");
  const [balance, setBalance] = useState("");
  const [cryptoSymbol, setSymbol] = useState("");
  const [isHidden, setIsHidden] = useState(true);
  
  async function handleClick() {
    // console.log(inputValue);
    const principal = Principal.fromText(inputValue);
    const balance = await token.balanceOf(principal);

    setBalance(balance.toLocaleString());
    setSymbol(await token.getSymbol());
    setIsHidden(false);
  }


  return (
    <div className="window white">
      <label>Check account token balance:</label>
      <p>
        <input
          id="balance-principal-id"
          type="text"
          placeholder="Enter a Principal ID"
          value = {inputValue}
          onChange = {(event)=>setInput(event.target.value)}
        />
      </p>
      <p className="trade-buttons">
        <button
          id="btn-request-balance"
          onClick={handleClick}
        >
          Check Balance
        </button>
      </p>
      <p hidden={isHidden}>This account has a balance of {balance} {cryptoSymbol}.</p>
    </div>
  );
}

export default Balance;
