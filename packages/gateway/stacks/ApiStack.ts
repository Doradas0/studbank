import { App, Stack, StackProps } from "aws-cdk-lib";
import {
  AuthorizationType,
  RestApi,
  MethodLoggingLevel,
} from "aws-cdk-lib/aws-apigateway";

const { STAGE = "test" } = process.env;

export class ApiStack extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);

    const api = new RestApi(this, `StudBank-Api-${STAGE}`, {
      restApiName: `StudBank-Api-${STAGE}`,
      deploy: true,
      deployOptions: {
        tracingEnabled: true,
        stageName: `${STAGE}`,
        loggingLevel: MethodLoggingLevel.INFO,
      },
      defaultMethodOptions: {
        //TODO add authorization
        //The authorization for each method will be defind within the services method definiton
        //This will be done using cognito scopes
        authorizationType: AuthorizationType.NONE,
      },
    });

    api.root.addResource("docs").addMethod("GET");

  }
}

