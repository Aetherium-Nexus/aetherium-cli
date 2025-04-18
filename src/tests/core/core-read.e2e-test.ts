import { expect } from "chai";
import { Signer, Wallet, ethers } from "ethers";

import {
  ChainMetadata,
  CoreConfig,
  ProtocolFeeHookConfig,
} from "@aetherium-nexus/sdk";
import { Address } from "@aetherium-nexus/utils";

import { readYamlOrJson } from "../../utils/files.js";
import { aetheriumCoreDeploy, readCoreConfig } from "../commands/core.js";
import {
  ANVIL_KEY,
  CHAIN_2_METADATA_PATH,
  CHAIN_NAME_2,
  CORE_CONFIG_PATH,
  CORE_READ_CONFIG_PATH_2,
  DEFAULT_E2E_TEST_TIMEOUT,
} from "../commands/helpers.js";

describe("aetherium core read e2e tests", async function () {
  this.timeout(DEFAULT_E2E_TEST_TIMEOUT);

  let signer: Signer;
  let initialOwnerAddress: Address;

  before(async () => {
    const chainMetadata: ChainMetadata = readYamlOrJson(CHAIN_2_METADATA_PATH);

    const provider = new ethers.providers.JsonRpcProvider(
      chainMetadata.rpcUrls[0].http
    );

    const wallet = new Wallet(ANVIL_KEY);
    signer = wallet.connect(provider);

    initialOwnerAddress = await signer.getAddress();
  });

  it("should read a core deployment", async () => {
    await aetheriumCoreDeploy(CHAIN_NAME_2, CORE_CONFIG_PATH);

    const coreConfig: CoreConfig = await readCoreConfig(
      CHAIN_NAME_2,
      CORE_READ_CONFIG_PATH_2
    );

    expect(coreConfig.owner).to.equal(initialOwnerAddress);
    expect(coreConfig.proxyAdmin?.owner).to.equal(initialOwnerAddress);
    expect(coreConfig.requiredHook).not.to.be.undefined;
    expect(coreConfig.defaultHook).not.to.be.undefined;
    expect(coreConfig.defaultIsm).not.to.be.undefined;
    // Assuming that the ProtocolFeeHook is used for deployment
    expect((coreConfig.requiredHook as ProtocolFeeHookConfig).owner).to.equal(
      initialOwnerAddress
    );
  });
});
