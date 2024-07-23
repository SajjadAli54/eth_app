// Filename - App.js
// Importing modules
import React, { useState } from "react";
import { ethers } from "ethers";
import "./App.css";
import { Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState(null);

  const btnhandler = async () => {
    if (window.ethereum) {
      const res = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const balance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [res[0], "latest"],
      });

      setAddress(res[0]);
      setBalance(ethers.utils.formatEther(balance));
    } else {
      alert("install metamask extension!!");
    }
  };

  const handleSent = async () => {
    if (window.ethereum && address) {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );
      const signer = provider.getSigner();

      // Define transaction parameters
      const tx = {
        to: "0x5345850C2BCaA6618Ca15791bB2A7569E3eAD943", // Replace with the recipient address
        value: ethers.utils.parseEther("0.01"), // Replace with the amount to send
      };

      try {
        const transaction = await signer.sendTransaction(tx);
        console.log("Transaction sent:", transaction);

        const balance = await window.ethereum.request({
          method: "eth_getBalance",
          params: [address, "latest"],
        });
        setBalance(ethers.utils.formatEther(balance));
      } catch (error) {
        console.error("Error sending transaction:", error);
      }
    } else {
      alert("Please connect to MetaMask and try again.");
    }
  };

  return (
    <div className="App">
      {/* Calling all values which we 
	have stored in usestate */}

      <Card className="text-center">
        <Card.Header>
          <strong>Address: </strong>
          {address}
        </Card.Header>
        <Card.Body>
          <Card.Text>
            <strong>Balance: </strong>
            {balance}
          </Card.Text>
          <Button onClick={btnhandler} variant="primary">
            {address ? "Connected" : "Connect to Wallet"}
          </Button>
          <Button onClick={handleSent} variant="primary">
            Send Transaction
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default App;
