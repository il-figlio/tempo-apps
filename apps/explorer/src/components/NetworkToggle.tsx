import { SUPPORTED_CHAINS, CHAIN_KEYS, SupportedChainKey } from "../networks";

export function NetworkToggle({
  currentNetwork,
  onSwitch,
}: {
  currentNetwork: SupportedChainKey;
  onSwitch: (key: SupportedChainKey) => void;
}) {
  return (
    <select
      value={currentNetwork}
      onChange={(e) => onSwitch(e.target.value as SupportedChainKey)}
      className="network-toggle"
    >
      {CHAIN_KEYS.map((key) => {
        const chain = SUPPORTED_CHAINS[key];
        return (
          <option key={key} value={key}>
            {chain.name} ({chain.nativeCurrency.symbol})
          </option>
        );
      })}
    </select>
  );
}
