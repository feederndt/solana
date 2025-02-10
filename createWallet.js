const solanaWeb3 = require("@solana/web3.js");
const bs58 = require('bs58');



const generateKey = async () => {
    const keyPair = solanaWeb3.Keypair.generate();

    console.log("Public Key:", keyPair.publicKey.toString());
    const secret = bs58.default.encode(keyPair.secretKey)
    console.log("Secret Key:", secret)
};

generateKey();