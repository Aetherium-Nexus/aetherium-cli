# Aetherium CLI

Aetherium command-line tool written in TypeScript that facilitates common operations on Aetherium Nexus, such as deploying the core contracts and/or wrap routes to new chains.

## Aetherium overview

Aetherium is an interchain messaging protocol that allows applications to communicate between blockchains.

Developers can use Aetherium Nexus Protocol to share state between blockchains, allowing them to build interchain applications that live natively across multiple chains.

To read more about interchain applications, how the protocol works, and how to integrate with Aetherium Nexus Protocol, please see the [documentation](https://docs.aetherium-nexus.com).

## Setup

Node 18 or newer is required.

**Option 1: Global install:**

```bash
# Install with NPM
npm install -g @aetheirum-nexus/cli
# Or uninstall old versions
npm uninstall -g @aetherium-nexus/cli
```

**Option 2: Temp install:**

```bash
# Run via NPM's npx command
npx @aetherium-nexus/cli
# Or via Yarn's dlx command
yarn dlx @aetherium-nexus/cli
```

**Option 3: Run from source:**

```bash
git clone https://github.com/Aetherium-Nexus/aetherium-cli.git
cd aetherium-cli
yarn install && yarn build
yarn aetherium
```

## Common commands

View help: `aetherium --help`

Create a core deployment config: `aetherium config create`

Run aetherium core deployments: `aetherium deploy core`

Run warp route deployments: `aetherium deploy warp`

View SDK contract addresses: `aetherium chains addresses`

Send test message: `aetherium send message`

## Logging

The logging format can be toggled between human-readable vs JSON-structured logs using the `LOG_FORMAT` environment variable or the `--log <pretty|json>` flag.

Note: If you are unable to see color output after setting `LOG_FORMAT`, you may set the `FORCE_COLOR=true` environment variable as a last resort. See https://force-color.org/ & https://github.com/chalk for more info.

The logging verbosity can be configured using the `LOG_LEVEL` environment variable or the `--verbosity <trace|debug|info|warn|error|off>` flag.
