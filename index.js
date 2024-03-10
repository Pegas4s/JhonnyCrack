const ethers = require("ethers");
const fs = require("fs/promises");

const API_KEY =
    "https://eth-mainnet.g.alchemy.com/v2/BIkGVZpVCk6qnA7Q2TauNOO1Qqo-kLJw"; 
const provider = new ethers.JsonRpcProvider(API_KEY);

async function main() {
  let i = 1;
  while (1) {
    let wallet = ethers.Wallet.createRandom(); // create a new wallet
    let mnemonic = wallet.mnemonic.phrase; // mnemonic
    let address = wallet.address; // address
    let balance = ethers.formatEther(await provider.getBalance(wallet.address)); // balance
    if (i % 1000 === 0) {
        console.log(balance); // Log the balance
        i = 1;
    }

    i++;
    if (balance !== "0.0") {
      console.log(mnemonic);
      console.log(balance);
      console.log(wallet);
      console.log(address);

      // found ether in wallet
      let crackedData;
      await fs
        .readFile("./cracked.json") // log to json file
        .then((data) => {
          crackedData = JSON.parse(data);
        })
        .catch((err) => {
          throw err;
        });

      crackedData[address] = { mnemonic: mnemonic, balance: balance };
      await fs.writeFile(
        "./cracked.json",
        JSON.stringify(crackedData, null, 4),
        "utf8"
      );
    }
  }
}

main();
