// Check if contracts are deployed on all testnets
// Usage: node check-contracts.js

const CONTRACTS = [
  {
    chain: "Robinhood Testnet",
    rpc: "https://rpc.testnet.chain.robinhood.com/rpc",
    contracts: {
      RurouniYuHubV2: "0xDA8C0b678369898398B1419368176065A4e2D141",
      CheckmateNFT: "0xb8DD07F222809f9Ed6197c5D775068F1A15cF672",
      UserNFTFactory: "0xfC2398F73A3efC1d7BBE04DAa56e6616f78C685C"
    }
  },
  {
    chain: "ARC Testnet",
    rpc: "https://rpc.testnet.arc.network",
    contracts: {
      RurouniYuHubV2: "0xb8DD07F222809f9Ed6197c5D775068F1A15cF672",
      CheckmateNFT: "0xa37953Ae80D50d1F57a6A868c0A5430Ca6843793",
      UserNFTFactory: "0x92815921ef18c755Db328189823c397611Bf4cf5"
    }
  },
  {
    chain: "INK Sepolia",
    rpc: "https://rpc-gel-sepolia.inkonchain.com",
    contracts: {
      RurouniYuHubV2: "0xF0031527F2ABBaEDbebF4BC56CF0E34c0a937594",
      CheckmateNFT: "0x005664963060E96f630264bEbA5D0F7241B6502E",
      UserNFTFactory: "0xb6B7fAC46ADd99112774Da285745F277E0Bf6210"
    }
  },
  {
    chain: "GIWA Sepolia",
    rpc: "https://sepolia-rpc.giwa.io",
    contracts: {
      RurouniYuHubV2: "0x6DAEe80fCCeD9f8565d6BbAB5afDDDEBb9235648",
      CheckmateNFT: "0x76150a6a585a3717C5bA1A11274c0d19A3d7348c",
      UserNFTFactory: "0xf83110b42a5c34ADc6C07ccB26B811Fe2b6942E7"
    }
  }
];

async function checkContract(rpc, address) {
  const response = await fetch(rpc, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "eth_getCode",
      params: [address, "latest"],
      id: 1
    })
  });
  const data = await response.json();
  return data.result && data.result !== "0x";
}

async function main() {
  console.log("Checking contracts on all testnets...\n");
  for (const chain of CONTRACTS) {
    console.log(`\n${chain.chain}:`);
    for (const [name, address] of Object.entries(chain.contracts)) {
      try {
        const deployed = await checkContract(chain.rpc, address);
        console.log(`  ${deployed ? "✅" : "❌"} ${name}: ${address}`);
      } catch (e) {
        console.log(`  ⚠️  ${name}: Error checking`);
      }
    }
  }
}

main();
