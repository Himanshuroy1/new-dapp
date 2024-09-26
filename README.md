# Value Manager Dapp

This project demonstrates a simple Web3 application with a Solidity smart contract and a React.js frontend. The smart contract allows setting, incrementing, decrementing, and resetting a value.

## Project Overview

The project consists of:
- **Solidity Smart Contract**: Solidity smart contract is used for manipulating the stored value. The functions like setvalue, incrementing, decrementing, and reseting the value are defined inside the solidity file.
- **Next.js Frontend**: Next.js is used for interacting with the smart contract and also the functions that are declared in the file.

## How to Run

### Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/web3-assessment-contract.git
   cd web3-assessment-contract
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Deploy the Contract**

   -Ensure Hardhat local node is running:
   
   ```bash
   npx hardhat node
   ```
   Run this code in another terminal and keep it running in the other terminal.
   
   -Deploy the contract to the local node:
     
   ```bash
   npx hardhat run scripts/deploy.js --network localhost
   ```
   -Note the contract address from the deployment output after running this command.

4. **Configure the Frontend**

   Create a configuration file for the contract address:

     ```bash
     const CONTRACT_ADDRESS = "your_contract_address_here";
     ```
   Change the contract address in the 'index.js' file by the contract address noted while deploying the contract.

7. **Run the Frontend**

   ```bash
   npm start
   ```
   After running this command n the terminal. Now you can open the Dapp by using the url provided in the terminal.
