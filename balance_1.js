const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function isValidSolanaAddress(address) {
  // Regular expression to match a Solana wallet address
  const solanaAddressRegex = /^([1-9A-HJ-NP-Za-km-z]{44})$/;

  return solanaAddressRegex.test(address);
}

function promptForAddress() {
  rl.question('Please enter a Solana wallet address: ', (input) => {
    if (isValidSolanaAddress(input)) {
      console.log(input, ' - looks like a valid address. Need to verify if this address really exists');
      rl.close();
    } else {
      console.log('Wrong address. Please enter a VALID Solana wallet address.');
      promptForAddress();
    }
  });
}

promptForAddress();
