// generateWallets.js
const fs = require('fs');
const { Wallet } = require('ethers');

const TOTAL = 35;
const wallets = [];

for (let i = 0; i < TOTAL; i++) {
  const wallet = Wallet.createRandom();
  wallets.push({
    address: wallet.address,
    privateKey: wallet.privateKey,
  });
}

fs.writeFileSync('students.json', JSON.stringify(wallets, null, 2));
console.log("✅ Tạo xong 35 ví sinh viên!");
