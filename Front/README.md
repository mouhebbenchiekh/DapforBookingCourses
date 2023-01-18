# Decentralized courses booking system frontend with React for Student
A Decentralized courses booking system built on top of Ethereum blockchain using Hardhat, ethers, reactJS as technologies and many third party libraries <br>
The hardhat project related to this frontend [hardhat project](https://github.com/Frostbite22/DecentralizedCoursesBookingSystem)

## Prerequisites 
You need to have a crypto Wallet and connect with an account <br>
For web users, you can get a wallet through [MetaMask](https://metamask.io/) 

## Configuration 
Create .env file in the root directory and set up the contract addresses <br>
The contract address are produced by compile the smart contracts from the [hardhat project](https://github.com/Frostbite22/DecentralizedCoursesBookingSystem) <br>
Note : These are the Factory Contracts that creates all the other contracts (15 smart contract in total)
```
REACT_APP_STUDENT_CONTRACT_ADDRESS=
REACT_APP_STUDENT_LEVEL_CONTRACT_ADDRESS=
REACT_APP_SESSION_CONTRACT_ADDRESS=
REACT_APP_PATH_CONTRACT_ADDRESS=
REACT_APP_LEVEL_CONTRACT_ADDRESS=
REACT_APP_ADMIN_CONTRACT_ADDRESS=
```

## Available Scripts

Install using docker from this repository [https://hub.docker.com/r/medfares/decentralizedbooking](https://hub.docker.com/r/medfares/decentralizedbooking)  

In the project directory, you can run:

### `npm i`

install dependencies

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run deploy`

Deploy to Github pages

## Deployed at 
https://frostbite22.github.io/DecentralizedCoursesBookingSystemFront


