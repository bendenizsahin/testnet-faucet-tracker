// Check wallet balance on all testnets
// Usage: node check-balance.js <wallet-address>

const CHAINS = [
  {
    name: "Robinhood Testnet",
    rpc: "https://rpc.testnet.chain.robinhood.com/rpc",
    chainId: 46630
  },
  {
    name: "ARC Testnet",
    rpc: "https://rpc.testnet.arc.network",
    chainId: 5042002
  },
  {
    name: "INK Sepolia",
    rpc: "https://rpc-gel-sepolia.inkonchain.com",
    chainId: 763373
  },
  {
    name: "GIWA Sepolia",
    rpc: "https://sepolia-rpc.giwa.io",
    chainId: 91342
  },
  {
    name: "Base Sepolia",
    rpc: "https://sepolia.base.org",
    chainId: 84532
  }
];

async function checkBalance(address) {
  console.log(`Checking balance for: ${address}\n`);

  for (const chain of CHAINS) {
    try {
      const response = await fetch(chain.rpc, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: "eth_getBalance",
          params: [address, "latest"],
          id: 1
        })
      });
      const data = await response.json();
      const balance = parseInt(data.result, 16) / 1e18;
      console.log(`${chain.name}: ${balance.toFixed(4)} ETH`);
    } catch (e) {
      console.log(`${chain.name}: Error fetching balance`);
    }
  }
}

const address = process.argv[2];
if (!address) {
  console.log("Usage: node check-balance.js <wallet-address>");
  process.exit(1);
}

checkBalance(address);
