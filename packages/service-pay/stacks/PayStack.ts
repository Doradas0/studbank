import { App, Duration, RemovalPolicy, Stack, StackProps } from "aws-cdk-lib";
import {
  AuthorizationType,
  LambdaIntegration,
  RestApi,
  JsonSchema,
} from "aws-cdk-lib/aws-apigateway";
import { LogGroup } from "aws-cdk-lib/aws-logs";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import path from "path";
import { Architecture, Runtime } from "aws-cdk-lib/aws-lambda";
import { Lego_Pay_Request_Schema } from "../../events/schemas/Pay";

const { STAGE = "test" } = process.env;

export class PayStack extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);

    const logGroup = new LogGroup(this, "LogGroup", {
      logGroupName: "/aws/lambda/pay",
      removalPolicy: RemovalPolicy.DESTROY,
    });

    const payFunction = new NodejsFunction(this, "PayFunction", {
      runtime: Runtime.NODEJS_18_X,
      architecture: Architecture.ARM_64,
      timeout: Duration.seconds(10),
      logRetention: 1,
      memorySize: 128,
      entry: path.join(__dirname, "../src/pay.ts"),
      handler: "handler",
    });

    payFunction.addEnvironment("LOG_GROUP_NAME", logGroup.logGroupName);

    logGroup.grantWrite(payFunction);

    const api = new RestApi(this, `ServicePayApi-${STAGE}`, {
      restApiName: `service-pay-${STAGE}`,
      deploy: true,
      deployOptions: {
        tracingEnabled: true,
        stageName: `${STAGE}`,
      },
      defaultMethodOptions: {
        //TODO add authorization
        authorizationType: AuthorizationType.NONE,
      },
    });

    const Lego_Pay_Request_Model = api.addModel("PayRequestModel", {
      contentType: "application/json",
      modelName: "PayRequestModel",
      schema: Lego_Pay_Request_Schema as JsonSchema,
    });

    const payRequestValidator = api.addRequestValidator("PayRequestValidator", {
      requestValidatorName: "PayRequestValidator",
      validateRequestBody: true,
      validateRequestParameters: false,
    });

    api.root.addMethod("POST", new LambdaIntegration(payFunction), {
      requestModels: {
        "application/json": Lego_Pay_Request_Model,
      },
      requestValidator: payRequestValidator,
    });


  }
}
