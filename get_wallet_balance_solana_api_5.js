const { Connection, PublicKey } = require('@solana/web3.js');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function getSolanaWalletDetails(address) {
  try {
    const connection = new Connection('https://api.mainnet-beta.solana.com'); // Connect to Solana Mainnet

    const publicKey = new PublicKey(address);
    const accountInfo = await connection.getAccountInfo(publicKey);

    if (accountInfo) {
      const balance = accountInfo.lamports / 10**9; // Convert lamports to SOL

      console.log(`Address: ${address}`);
      console.log(`Balance: ${balance} SOL`);
      console.log(`Owner: ${accountInfo.owner.toBase58()}`);
      console.log(`Executable: ${accountInfo.executable}`);
      console.log(`Rent Epoch: ${accountInfo.rentEpoch}`);
      console.log(`Data Length: ${accountInfo.data.length} bytes`);
      console.log(`Delegated Stake: ${accountInfo.delegatedAmount}`);
      console.log(`Close Authority: ${accountInfo.closeAuthority ? accountInfo.closeAuthority.toBase58() : 'Not set'}`);
    } else {
      console.log('Account does NOT exist.');
    }
  } catch (error) {
    console.error('Error fetching account details:', error);
  }
}

async function promptForAddress() {
  rl.question('Please enter a Solana wallet address: ', async (input) => {
    const isValid = await isValidSolanaAddress(input);

    if (isValid) {
      await getSolanaWalletDetails(input);
      rl.close();
    } else {
      console.log('Address does NOT exist. Please enter a VALID existing Solana wallet address.');
      promptForAddress(); // Recursive call
    }
  });
}

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

promptForAddress();
