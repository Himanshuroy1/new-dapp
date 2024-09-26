import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import AssessmentABI from "../artifacts/contracts/Assessment.sol/Assessment.json";

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const App = () => {
  const [value, setValue] = useState(0);
  const [newValue, setNewValue] = useState("");
  const [changeValue, setChangeValue] = useState("");
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
        await web3Provider.send("eth_requestAccounts", []);
        const signer = web3Provider.getSigner();
        const assessmentContract = new ethers.Contract(CONTRACT_ADDRESS, AssessmentABI.abi, signer);

        setProvider(web3Provider);
        setContract(assessmentContract);


        const initialValue = await assessmentContract.value();
        setValue(initialValue.toString());
      } catch (error) {
        console.error("Initialization error:", error);
      }
    };

    init();
  }, []);

  const handleSetValue = async () => {
    try {
      const tx = await contract.setValue(parseInt(newValue));
      await tx.wait();
      const updatedValue = await contract.value();
      setValue(updatedValue.toString());
      setNewValue("");
    } catch (error) {
      console.error("Set Value error:", error);
    }
  };

  const handleIncrement = async () => {
    try {
      const incrementAmount = parseInt(changeValue);
      const tx = await contract.increment(incrementAmount);
      await tx.wait();
      const updatedValue = await contract.value();
      setValue(updatedValue.toString());
      setChangeValue("");
    } catch (error) {
      console.error("Increment error:", error);
    }
  };

  const handleDecrement = async () => {
    try {
      const decrementAmount = parseInt(changeValue);
      const tx = await contract.decrement(decrementAmount);
      await tx.wait();
      const updatedValue = await contract.value();
      setValue(updatedValue.toString());
      setChangeValue("");
    } catch (error) {
      console.error("Decrement error:", error);
    }
  };

  const handleReset = async () => {
    try {
      const tx = await contract.reset();
      await tx.wait();
      const updatedValue = await contract.value();
      setValue(updatedValue.toString());
    } catch (error) {
      console.error("Reset error:", error);
    }
  };

  return (
    <div>
      <h1>Value Manager Dapp!</h1>
      <p>Current Value: {value}</p>

      <div>
        <input
          type="number"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          placeholder="Enter value to set"
        />
        <button onClick={handleSetValue}>Set Value</button>
      </div>

      <div>
        <input
          type="number"
          value={changeValue}
          onChange={(e) => setChangeValue(e.target.value)}
          placeholder="Enter amount to increment/decrement"
        />
        <button onClick={handleIncrement}>Increment</button>
        <button onClick={handleDecrement}>Decrement</button>
      </div>

      <div>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default App;
