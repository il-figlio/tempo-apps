import { createPublicClient, http } from "viem";
import { signet } from "./signet/config";
import { base } from "./base/config";
import { tempo } from "./tempo/config";

export const SUPPORTED_CHAINS = {
  signet,
  base,
  tempo,
} as const;

export type SupportedChainKey = keyof typeof SUPPORTED_CHAINS;

export const CHAIN_KEYS = Object.keys(SUPPORTED_CHAINS) as SupportedChainKey[];

export const isChainKey = (v: string): v is SupportedChainKey =>
  CHAIN_KEYS.includes(v as SupportedChainKey);

export const getClient = (chainKey: SupportedChainKey) => {
  const chain = SUPPORTED_CHAINS[chainKey];
  return createPublicClient({
    chain,
    transport: http(chain.rpcUrls.default.http[0]),
  });
};

export const getChainById = (id: number) =>
  Object.values(SUPPORTED_CHAINS).find((c) => c.id === id) ?? signet;
