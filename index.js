// Import Solana web3 functinalities
const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL
} = require("@solana/web3.js");

const getPublicKeyFromArgs = () => {
    var publicKeyArg = process.argv[2]

    if (publicKeyArg == null || !publicKeyArg.toLocaleLowerCase().includes("publickey=")) {
        console.log("Invalid argument. publicKey not found. Please enter publicKey={string}")
        return
    }

    return publicKeyArg.split("=")[1]
}

// Get the wallet balance from a given private key
const getWalletBalance = async (publicKey) => {
    try {
        // Validate Public Key from the param
        if (publicKey == null || publicKey == '') {
            console.log("Invalid Public Key");
            return
        }

        // Connect to the Devnet
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        console.log("Connection object is:", connection);

        const walletBalance = await connection.getBalance(
            new PublicKey(publicKey)
        );

        console.log(`Wallet balance: ${parseInt(walletBalance) / LAMPORTS_PER_SOL} SOL`);
    } catch (err) {
        console.log(err);
    }
};

const airDropSol = async (publicKey) => {
    try {
        // Validate Public Key from the param
        if (publicKey == null || publicKey == '') {
            console.log("Invalid Public Key");
            return
        }

        // Connect to the Devnet and make a wallet from privateKey
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

        // Request airdrop of 2 SOL to the wallet
        console.log("Airdropping some SOL to my wallet!");
        const fromAirDropSignature = await connection.requestAirdrop(
            new PublicKey(publicKey),
            2 * LAMPORTS_PER_SOL
        );
        await connection.confirmTransaction(fromAirDropSignature);
    } catch (err) {
        console.log(err);
    }
};

// Show the wallet balance before and after airdropping SOL
const mainFunction = async () => {
    var publicKey = getPublicKeyFromArgs();
    if (publicKey == null) {
        return
    }
    await getWalletBalance(publicKey);
    await airDropSol(publicKey);
    await getWalletBalance(publicKey);
}

mainFunction();