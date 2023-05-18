import React, {useState} from "react";
import {token} from '../../../declarations/token';
import {Principal} from "@dfinity/principal";

function Transfer() {

  const [accountTo, setAccountTo] = useState('');
  const [amount, setAmount] = useState('');
  const [isHidden, setIsHidden] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [feedback, setFeedback] = useState("");
  
  async function handleClick() {
    setIsDisabled(true);
    const principalAccountTo = Principal.fromText(accountTo);
    const result = await token.transferTo(principalAccountTo, Number(amount));
    setFeedback(result);
    setIsHidden(false);
    setIsDisabled(false);
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value={accountTo}
                onChange={event => setAccountTo(event.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={event => setAmount(event.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button id="btn-transfer" onClick={handleClick} disabled={isDisabled}>
            Transfer
          </button>
        </p>
        <p hidden={isHidden}>
          {feedback}
        </p>
      </div>
    </div>
  );
}

export default Transfer;
