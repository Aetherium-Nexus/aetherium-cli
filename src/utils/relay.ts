import { HookType, AetheriumRelayer } from "@aetherium-nexus/sdk";

/**
 * Workaround helper for bypassing bad hook derivation when self-relaying.
 */
export function stubMerkleTreeConfig(
  relayer: AetheriumRelayer,
  chain: string,
  hookAddress: string,
  merkleAddress: string
) {
  relayer.hydrate({
    hook: {
      [chain]: {
        [hookAddress]: {
          type: HookType.MERKLE_TREE,
          address: merkleAddress,
        },
      },
    },
    ism: {},
    backlog: [],
  });
}
