import type { MultiProvider, SubmissionStrategy } from "@aetherium-nexus/sdk";

export type SubmitterBuilderSettings = {
  submissionStrategy: SubmissionStrategy;
  multiProvider: MultiProvider;
};
