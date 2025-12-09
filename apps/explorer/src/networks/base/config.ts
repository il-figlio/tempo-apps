import { defineChain } from "viem";

export const base = defineChain({
  id: 8453,
  name: "Base",
  network: "base",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://mainnet.base.org"] },
  },
  blockExplorers: {
    default: { name: "Basescan", url: "https://basescan.org" },
  },
  testnet: false,
} as const);
