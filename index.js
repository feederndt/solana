const web3 = require("@solana/web3.js");
const bs58 = require("bs58");
const fs = require('fs');

const connection = new web3.Connection('https://rpc.mainnet.soo.network/rpc');

const gas = 3000

const address_datas = fs.readFileSync('walletAddress.txt', 'utf8');

const private_datas = fs.readFileSync('privateKey.txt', 'utf8');


const walletArr = address_datas.split(/\r?\n|\r|\n/g).filter(e => e.length > 0)

const privateArr = private_datas.split(/\r?\n|\r|\n/g).filter(e => e.length > 0)

const getBalance = async (publicKey) => {
    const balance = await connection.getBalance(publicKey);
    console.log(balance)
    return balance;
};

const sendSoon_ethmultitomulti = async () => {
    if (walletArr.length !== 0 && privateArr.length != 0 && walletArr.length == privateArr.length) {
        for (let i = 0; i < walletArr.length; i++) {
            const privateKey = new Uint8Array(bs58.default.decode(privateArr[i].trim()));
            const account = web3.Keypair.fromSecretKey(privateKey);

            const balance = await getBalance(account.publicKey);

            if (Number(balance) - gas > 0) {
                const transaction = new web3.Transaction().add(
                    web3.SystemProgram.transfer({
                        fromPubkey: account.publicKey,
                        toPubkey: walletArr[i].trim(),
                        lamports: Number(balance) - gas,
                    }),
                );
                const signature = await web3.sendAndConfirmTransaction(
                    connection,
                    transaction,
                    [account],
                );
            } else {
                console.log("Lam deo gi co tien ma chuyen")
            }
        }
    } else {
        console.log("Djt me cuoc doi")
    }
}

sendSoon_ethmultitomulti()



