import { $, ProcessPromise } from 'zx';

import { DerivedCoreConfig } from '@aetherium-nexus/sdk';
import { Address } from '@aetherium-nexus/utils';

import { readYamlOrJson } from '../../utils/files.js';

import { ANVIL_KEY, REGISTRY_PATH } from './helpers.js';

/**
 * Deploys the Aetherium core contracts to the specified chain using the provided config.
 */
export function aetheriumCoreDeployRaw(
  coreInputPath: string,
  privateKey?: string,
  skipConfirmationPrompts?: boolean,
  aetKey?: string,
): ProcessPromise {
  if (aetKey) {
    return $`AET_KEY=${aetKey} yarn workspace @aetherium-nexus/cli run aetherium core deploy \
        --registry ${REGISTRY_PATH} \
        --config ${coreInputPath} \
        --verbosity debug \
        ${skipConfirmationPrompts ? '--yes' : ''}`;
  }

  if (privateKey) {
    return $`yarn workspace @aetherium-nexus/cli run aetherium core deploy \
        --registry ${REGISTRY_PATH} \
        --config ${coreInputPath} \
        --key ${privateKey} \
        --verbosity debug \
        ${skipConfirmationPrompts ? '--yes' : ''}`;
  }

  return $`yarn workspace @aetherium-nexus/cli run aetherium core deploy \
        --registry ${REGISTRY_PATH} \
        --config ${coreInputPath} \
        --verbosity debug \
        ${skipConfirmationPrompts ? '--yes' : ''}`;
}

/**
 * Deploys the Aetherium core contracts to the specified chain using the provided config.
 */
export async function aetheriumCoreDeploy(
  chain: string,
  coreInputPath: string,
) {
  return $`yarn workspace @aetherium-nexus/cli run aetherium core deploy \
        --registry ${REGISTRY_PATH} \
        --config ${coreInputPath} \
        --chain ${chain} \
        --key ${ANVIL_KEY} \
        --verbosity debug \
        --yes`;
}

/**
 * Reads a Aetherium core deployment on the specified chain using the provided config.
 */
export async function aetheriumCoreRead(chain: string, coreOutputPath: string) {
  return $`yarn workspace @aetherium-nexus/cli run aetherium core read \
        --registry ${REGISTRY_PATH} \
        --config ${coreOutputPath} \
        --chain ${chain} \
        --verbosity debug \
        --yes`;
}

/**
 * Verifies that a Aetherium core deployment matches the provided config on the specified chain.
 */
export function aetheriumCoreCheck(
  chain: string,
  coreOutputPath: string,
  mailbox?: Address,
): ProcessPromise {
  if (mailbox) {
    return $`yarn workspace @aetherium-nexus/cli run aetherium core check \
        --registry ${REGISTRY_PATH} \
        --config ${coreOutputPath} \
        --chain ${chain} \
        --mailbox ${mailbox} \
        --verbosity debug \
        --yes`;
  }

  return $`yarn workspace @aetherium-nexus/cli run aetherium core check \
        --registry ${REGISTRY_PATH} \
        --config ${coreOutputPath} \
        --chain ${chain} \
        --verbosity debug \
        --yes`;
}

/**
 * Creates a Aetherium core deployment config
 */
export function aetheriumCoreInit(
  coreOutputPath: string,
  privateKey?: string,
  aet_key?: string,
): ProcessPromise {
  if (aet_key) {
    return $`${
      aet_key ? `AET_KEY=${aet_key}` : ''
    } yarn workspace @aetherium-nexus/cli run aetherium core init \
        --registry ${REGISTRY_PATH} \
        --config ${coreOutputPath} \
        --verbosity debug \
        --yes`;
  }

  if (privateKey) {
    return $`${
      aet_key ? 'AET_KEY=${aet_key}' : ''
    } yarn workspace @aetherium-nexus/cli run aetherium core init \
        --registry ${REGISTRY_PATH} \
        --config ${coreOutputPath} \
        --verbosity debug \
        --key ${privateKey} \
        --yes`;
  }

  return $`yarn workspace @aetherium-nexus/cli run aetherium core init \
        --registry ${REGISTRY_PATH} \
        --config ${coreOutputPath} \
        --verbosity debug \
        --yes`;
}

/**
 * Updates a Aetherium core deployment on the specified chain using the provided config.
 */
export async function aetheriumCoreApply(
  chain: string,
  coreOutputPath: string,
) {
  return $`yarn workspace @aetherium-nexus/cli run aetherium core apply \
        --registry ${REGISTRY_PATH} \
        --config ${coreOutputPath} \
        --chain ${chain} \
        --key ${ANVIL_KEY} \
        --verbosity debug \
        --yes`;
}

/**
 * Reads the Core deployment config and outputs it to specified output path.
 */
export async function readCoreConfig(
  chain: string,
  coreConfigPath: string,
): Promise<DerivedCoreConfig> {
  await aetheriumCoreRead(chain, coreConfigPath);
  return readYamlOrJson(coreConfigPath);
}
