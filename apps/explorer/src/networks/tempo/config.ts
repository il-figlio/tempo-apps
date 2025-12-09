import { defineChain } from "viem";

export const tempo = defineChain({
  id: 11111,
  name: "Tempo",
  network: "tempo",
  nativeCurrency: { name: "Tempo", symbol: "TMPO", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.tempo.xyz"] },
  },
  blockExplorers: {
    default: { name: "TempoScan", url: "https://scan.tempo.xyz" },
  },
  testnet: false,
} as const);
