import { defineChain } from "viem";

export const signet = defineChain({
  id: 52652,
  name: "Signet",
  network: "signet",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.signet.init4.tech"] },
  },
  blockExplorers: {
    default: { name: "SignetScan", url: "https://scan.signet.init4.tech" },
  },
  testnet: true,
} as const);
