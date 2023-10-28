const { Connection, PublicKey } = require('@solana/web3.js');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function isValidSolanaAddress(address) {
  try {
    const connection = new Connection('https://api.mainnet-beta.solana.com'); // Connect to Solana Mainnet

    const publicKey = new PublicKey(address);
    const accountInfo = await connection.getAccountInfo(publicKey);

    return !!accountInfo;
  } catch (error) {
    return false;
  }
}

async function getSolanaWalletDetails(address) {
  const connection = new Connection('https://api.mainnet-beta.solana.com');
  const publicKey = new PublicKey(address);
  const accountInfo = await connection.getAccountInfo(publicKey);

  if (accountInfo) {
    const balance = accountInfo.lamports / 10**9; // Convert lamports to SOL
    console.log(`Address: ${address}`);
    console.log(`Balance: ${balance} SOL`);
  }
}

async function promptForValidAddress() {
  rl.question('Please enter a Solana wallet address: ', async (input) => {
    const isValid = await isValidSolanaAddress(input);

    if (isValid) {
      await getSolanaWalletDetails(input);
      rl.close();
    } else {
      console.log('Address does NOT exist. Please enter a VALID existing Solana wallet address.');
      promptForValidAddress();
    }
  });
}

promptForValidAddress();

