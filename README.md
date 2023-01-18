# DapforBookingCourses

# Decentralized Courses Booking system based on Smart contracts

This is a decentralized courses booking system based on smart contracts, built with hardhat, solidity, Ethers JS ,reactJS as technologies and many third party libraries .

## Requirements :

You need to have a crypto Wallet and connect with an account <br>
For web users, you can get a wallet through [MetaMask](https://metamask.io/)

You need to have a wallet with testnet ethereum on the Goerli network
[Get free Goerli faucet](https://goerlifaucet.com/)

## Architecture :

![alt text](https://github.com/Frostbite22/DecentralizedCoursesBookingSystem/blob/main/architecture.png?raw=true)

## Design Patterns :

### Normal Factory design pattern

to create the student and Session objects in Factory Class

### Method template design pattern

thus creating an abstract interface for the student and use it in the Factory ckass to create the student

![alt text](https://github.com/Frostbite22/DecentralizedCoursesBookingSystem/blob/main/course_system_white.png?raw=true)

## Generating and deploying Smart Contracts

## Setting up the project

### Clone the project

then `cd Dapforbookingcourses/DapSystem`

### Install npm dependencies

`npm i`

### Configurations

create `.env` file in the root directory
set up these constants

```
QUICKNODE_API_URL=YOUR_QUICKNODE_API_KEY
ACCOUNT_PK=YOUR_RINKEBY_ACCOUNT_PK
ETHERSCAN_API_KEY=YOUR_ETHERSCAN_API_KEY
COINMARKETCAP_API_KEY=YOUR_COINMARKETCAP_API_KEY
GOERLI_ALCHEMY_URL=GOERLI_ALCHEMY_URL
```

## Try running some of the following tasks:

compile the contracts

```
npx hardhat compile
```

deploy the contracts locally

```
npx hardhat run scripts/deploy.js
```

deploy the contracts to goerli network

```
npx hardhat run scripts/deploy.js --network goerli
```

Unit Testing for the contract

```
npx hardhat test
```

Test coverage report

```
npx hardhat coverage
```

Execute Balance task

```
npx hardhat balance --account account_public_key
```

## Front Running

## Configuration

Create .env file in the root directory and set up the contract addresses <br>
The contract address are produced by compile the smart contracts from the ../DapSystem <br>
Note : These are the Factory Contracts that creates all the other contracts (15 smart contract in total)

```
REACT_APP_STUDENT_CONTRACT_ADDRESS=
REACT_APP_STUDENT_LEVEL_CONTRACT_ADDRESS=
REACT_APP_SESSION_CONTRACT_ADDRESS=
REACT_APP_PATH_CONTRACT_ADDRESS=
REACT_APP_LEVEL_CONTRACT_ADDRESS=
REACT_APP_ADMIN_CONTRACT_ADDRESS=
```

### `npm i`

install dependencies

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## DEMO:

watch this video
