import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import AssessmentABI from "../artifacts/contracts/Assessment.sol/Assessment.json";

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const App = () => {
  const [message, setMessage] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [value, setValue] = useState(0);
  const [newValue, setNewValue] = useState("");
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

        // Fetch initial values
        const initialMessage = await assessmentContract.retrieveMessage();
        const initialValue = await assessmentContract.retrieveValue();
        setMessage(initialMessage);
        setValue(initialValue.toString());
      } catch (error) {
        console.error("Initialization error:", error);
      }
    };

    init();
  }, []);

  const handleSetMessage = async () => {
    try {
      const tx = await contract.updateMessage(newMessage);
      await tx.wait();
      const updatedMessage = await contract.retrieveMessage();
      setMessage(updatedMessage);
      setNewMessage("");
    } catch (error) {
      console.error("Set Message error:", error);
    }
  };

  const handleSetValue = async () => {
    try {
      const tx = await contract.updateValue(parseInt(newValue));
      await tx.wait();
      const updatedValue = await contract.retrieveValue();
      setValue(updatedValue.toString());
      setNewValue("");
    } catch (error) {
      console.error("Set Value error:", error);
    }
  };

  const handleResetMessage = async () => {
    try {
      const tx = await contract.clearMessage();
      await tx.wait();
      const updatedMessage = await contract.retrieveMessage();
      setMessage(updatedMessage);
    } catch (error) {
      console.error("Reset Message error:", error);
    }
  };

  const handleResetValue = async () => {
    try {
      const tx = await contract.resetValue();
      await tx.wait();
      const updatedValue = await contract.retrieveValue();
      setValue(updatedValue.toString());
    } catch (error) {
      console.error("Reset Value error:", error);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={boxStyle}>
        <h1>Assessment Dapp</h1>

        <div>
          <h2>Current Message: {message}</h2>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Enter new message"
          />
          <button onClick={handleSetMessage}>Set Message</button>
          <button onClick={handleResetMessage}>Reset Message</button>
        </div>

        <div>
          <h2>Current Value: {value}</h2>
          <input
            type="number"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            placeholder="Enter new value"
          />
          <button onClick={handleSetValue}>Set Value</button>
          <button onClick={handleResetValue}>Reset Value</button>
        </div>
      </div>
    </div>
  );
};

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundColor: "#f4f4f4",
};

const boxStyle = {
  padding: "20px",
  backgroundColor: "#fff",
  borderRadius: "10px",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  width: "400px",
  textAlign: "center",
};

export default App;