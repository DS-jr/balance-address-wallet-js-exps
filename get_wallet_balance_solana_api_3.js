// There are errors in this draft code

const { Connection, PublicKey } = require('@solana/web3.js');

const connection = new Connection('https://api.mainnet-beta.solana.com');

async function getSolanaWalletDetails(address) {
  try {
    // Convert the input address to a PublicKey object.
    const publicKey = new PublicKey(address);

    // Get the account information for the PublicKey object.
    const accountInfo = await connection.getAccountInfo(publicKey);

    // If the accountInfo is null, then the address does not exist.
    if (!accountInfo) {
      console.log('Address does NOT exist');
      return;
    }

    // Get the balance of the account.
    const balance = await connection.getBalance(publicKey);

    // Get the token holdings of the account.
    const tokenHoldings = await connection.getTokenHoldings(publicKey);

    // Output the account details to the console.
    console.log(`Address: ${address}`);
    console.log(`Balance: ${balance}`);
    console.log('Token holdings:');
    for (const tokenHolding of tokenHoldings) {
      console.log(` - ${tokenHolding.amount} ${tokenHolding.mint}`);
    }
  } catch (error) {
    console.log(error);
  }
}

const { prompt } = require('readline'); // Errors 

// Get the input address from the console.
const address = prompt('Enter a Solana wallet address: '); // Errors

// Verify the input address.
const isAddressValid = connection.isAddress(address);

// If the address is valid, get the details about the address.
if (isAddressValid) {
  getSolanaWalletDetails(address);
} else {
  // The address is not valid.
  console.log('Invalid address.');
}
