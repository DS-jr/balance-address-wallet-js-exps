const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('tYpe soMe iNput: ', (input) => {
  console.log(`yOu enTered: ${input}`);
  rl.close();
});
