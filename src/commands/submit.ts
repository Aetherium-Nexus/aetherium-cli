import {
  SubmissionStrategy,
  SubmissionStrategySchema,
} from "@aetherium-nexus/sdk";

import { runSubmit } from "../config/submit.js";
import { CommandModuleWithWriteContext } from "../context/types.js";
import { logBlue, logGray } from "../logger.js";
import { readYamlOrJson } from "../utils/files.js";

import {
  dryRunCommandOption,
  outputFileCommandOption,
  strategyCommandOption,
  transactionsCommandOption,
} from "./options.js";

/**
 * Submit command
 */
export const submitCommand: CommandModuleWithWriteContext<{
  transactions: string;
  strategy: string;
  "dry-run": string;
  receipts: string;
}> = {
  command: "submit",
  describe: "Submit transactions",
  builder: {
    transactions: transactionsCommandOption,
    strategy: strategyCommandOption,
    "dry-run": dryRunCommandOption,
    receipts: outputFileCommandOption("./generated/transactions/receipts.yaml"),
  },
  handler: async ({
    context,
    transactions,
    strategy: strategyUrl,
    receipts,
  }) => {
    logGray(`Aetherium Submit`);
    logGray(`----------------`);

    const submissionStrategy = readSubmissionStrategy(strategyUrl);
    await runSubmit({
      context,
      transactionsFilepath: transactions,
      receiptsFilepath: receipts,
      submissionStrategy,
    });

    logBlue(`✅ Submission complete`);
    process.exit(0);
  },
};

/**
 * Retrieves a submission strategy from the provided filepath.
 * @param submissionStrategyFilepath a filepath to the submission strategy file
 * @returns a formatted submission strategy
 */
export function readSubmissionStrategy(
  submissionStrategyFilepath: string
): SubmissionStrategy {
  const submissionStrategyFileContent = readYamlOrJson(
    submissionStrategyFilepath.trim()
  );
  return SubmissionStrategySchema.parse(submissionStrategyFileContent);
}
