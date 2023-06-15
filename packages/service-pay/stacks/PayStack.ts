import { App, Duration, Fn, RemovalPolicy, Stack, StackProps } from "aws-cdk-lib";
import {
  LambdaIntegration,
  RestApi,
  JsonSchema,
  Model,
  RequestValidator,
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

    const apiId = Fn.importValue(`StudBank-Api-id-${STAGE}`);
    const apiRootResourceId = Fn.importValue(`StudBank-Api-RootResourceId-${STAGE}`);
    const api = RestApi.fromRestApiAttributes(this, "Api", {
      restApiId: apiId,
      rootResourceId: apiRootResourceId,
    });

    //Create api model based on json schema from zod object
    const Lego_Pay_Request_Model = new Model(this, "Lego_Pay_Request_Model", {
      restApi: api,
      contentType: "application/json",
      modelName: "PayRequestModel",
      //Setting type as JsonSchema is dangerous, but required due to cdk api gateway type restrictions
      schema: Lego_Pay_Request_Schema as JsonSchema,
    });

    //Specify that request body should be validated against model schema
    const payRequestValidator = new RequestValidator(this, "PayRequestValidator", {
      restApi: api,
      requestValidatorName: "PayRequestValidator",
      validateRequestBody: true,
      validateRequestParameters: false,
    });

    //Define api resource method
    api.root.addMethod("POST", new LambdaIntegration(payFunction), {
      requestModels: {
        "application/json": Lego_Pay_Request_Model,
      },
      requestValidator: payRequestValidator,
    });
  }
}
