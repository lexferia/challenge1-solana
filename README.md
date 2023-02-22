# Challenge 1 - Solana 
Solana - Airdrop SOL

## How to run
### Generate wallet
if didn't yet created a wallet, you just need to run the following in CLI:
```bash
  node generateWallet
```
then, you will get the following output:
```bash
  Public Key of the generated keypair {string}
```
### Check wallet balance and airdrop 2 lamport
run the following in CLI:
```bash
  node index publicKey={string}
```
then, you will find the following line below as a part of the output when it is successful
```bash
  Wallet balance: 2 SOL
```