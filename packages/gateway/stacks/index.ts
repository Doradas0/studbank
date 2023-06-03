import { App, Environment } from "aws-cdk-lib";
import { ApiStack } from "./ApiStack";

const { STAGE = "test" } = process.env;

if (typeof STAGE === "undefined") {
  throw new Error("Environment variable STAGE is undefined");
}

const app = new App();

const env = {
  account: process.env.AWS_ACCOUNT_ID || process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.AWS_REGION || process.env.CDK_DEFAULT_REGION,
} as Environment;

new ApiStack(app, `ApiStack-${STAGE}`, { env });
