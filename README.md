
# WELCOME TO DREAMSLOOM TOKEN (DLOOM) DAPP!!

Get your free DreamsLoom tokens here! And transfer to your friends...

With your free DBLOOM Tokens you will be able to buy NFTs on the [OpenD NFT Marketplace](https://github.com/palazard/nft-marketplace-web3)!


## Here the steps:
1. Authentificate with Internet Identity
2. Claim your free 10000 DLOOM Tokens from the Faucet
3. Check your balance and send tokens to your friends

Fork the project and test in on your local ICP!


## Technologies
### Frontend
This project was bootstrapped with React.js.
Routing with React Router (react-router-dom).

### Backend
Motoko for ICP
Authentication with Internet Identity



----------------------------------------------------------------
# GUIDE

# Check your Balance

1. Find out your principal id:

```
dfx identity get-principal
```

2. Save it somewhere.

e.g. My principal id is: gbdev-tyqsv-hnvqv-7mgz4-4kcfl-wbv6x-6khez-y56gq-uohqs-quomc-uqe


3. Format and store it in a command line variable:
```
OWNER_PUBLIC_KEY="principal \"$( \dfx identity get-principal )\""
```

4. Check that step 3 worked by printing it out:
```
echo $OWNER_PUBLIC_KEY
```

5. Check the owner's balance:
```
dfx canister call token balanceOf "( $OWNER_PUBLIC_KEY )"
```

# Charge the Canister


1. Check canister ID:
```
dfx canister id token
```

2. Save canister ID into a command line variable:
```
CANISTER_PUBLIC_KEY="principal \"$( \dfx canister id token )\""
```

3. Check canister ID has been successfully saved:
```
echo $CANISTER_PUBLIC_KEY
```

4. Transfer half a billion tokens to the canister Principal ID:
```
dfx canister call token transferTo "($CANISTER_PUBLIC_KEY, 500_000_000)"
```

# To Deploy (in local to call function from NFT marketplace)

1. Find out your principal id:

```
dfx identity get-principal
```

2. Replace the <REPLACE WITH YOUR PRINCIPAL> in main.mo with the principal you got from step 1.

```
  let owner : Principal = Principal.fromText("<REPLACE WITH YOUR PRINCIPAL>");
  let owner : Principal = Principal.fromText("m3ku4-zhrde-bfwli-xix4y-gybz5-c6bw5-urkyt-grn3u-o36gk-mec6z-dae");
```

3. Open up a new terminal in this VSCode project and deploy the token canister:

```
dfx deploy token
```

4. Start the frontend:

```
npm start
```

5. Set the canister id to a local variable:

```
CANISTER_PUBLIC_KEY="principal \"$( \dfx canister id token )\""
```

6. Transfer half a billion tokens to the canister Principal ID:

```
dfx canister call token transferTo "($CANISTER_PUBLIC_KEY, 500_000_000)"
```

7. Claim the tokens from the faucet on the frontend website.

8. Get token canister id:

```
dfx canister id token
```

# Deploy the Project to the Live IC Network

1. Create and deploy canisters:

```
dfx deploy --network ic
```

2. Check the live canister ID:
```
dfx canister --network ic id token
```

3. Save the live canister ID to a command line variable:
```
LIVE_CANISTER_KEY="principal \"$( \dfx canister --network ic id token )\""
```

4. Check that it worked:
```
echo $LIVE_CANISTER_KEY
```

5. Transfer some tokens to the live canister:
```
dfx canister --network ic call token transferTo "($LIVE_CANISTER_KEY, 50_000_000)"
```

6. Get live canister front-end id:
```
dfx canister --network ic id token_assets
```
7. Copy the id from step 6 and add .raw.ic0.app to the end to form a URL.
e.g. zdv65-7qaaa-aaaai-qibdq-cai.raw.ic0.app