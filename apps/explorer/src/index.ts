import { isChainKey, getClient, SupportedChainKey } from "./networks";

export default {
  async fetch(request: Request) {
    const url = new URL(request.url);
    const [maybeChainKey] = url.pathname.split("/").filter(Boolean);

    const chainKey: SupportedChainKey =
      maybeChainKey && isChainKey(maybeChainKey)
        ? (maybeChainKey as SupportedChainKey)
        : "signet";

    const client = getClient(chainKey);
    const blockNumber = await client.getBlockNumber();

    return new Response(
      JSON.stringify({
        network: client.chain.name,
        blockNumber,
      }),
      { headers: { "content-type": "application/json" } }
    );
  },
};
