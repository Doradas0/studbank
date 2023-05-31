import { handler } from "../pay";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Lego_Pay_Request, Lego_Pay_Item } from "../../../events/schemas/Pay";

const body: Lego_Pay_Request = {
  amount: {
    currency: "USD",
    value: "100",
  },
  paymentMethod: "ideal",
};

const event: APIGatewayProxyEvent = {
  body: JSON.stringify(body),
  headers: {
    "Content-Type": "application/json",
  },
  httpMethod: "POST",
  isBase64Encoded: false,
  path: "/pay",
  pathParameters: null,
  queryStringParameters: null,
  stageVariables: null,
  multiValueHeaders: { "Content-Type": ["application/json"] },
  multiValueQueryStringParameters: null,
  requestContext: {
    accountId: "123456789012",
    apiId: "1234567890",
    authorizer: null,
    protocol: "HTTP/1.1",
    httpMethod: "POST",
    identity: {
      accessKey: null,
      accountId: null,
      apiKey: null,
      apiKeyId: null,
      caller: null,
      cognitoAuthenticationProvider: null,
      cognitoAuthenticationType: null,
      cognitoIdentityId: null,
      cognitoIdentityPoolId: null,
      principalOrgId: null,
      sourceIp: "IP",
      clientCert: null,
      user: "test",
      userAgent: null,
      userArn: null,
    },
    path: "/pay",
    stage: "test-invoke-stage",
    requestId: "test-invoke-request",
    requestTimeEpoch: 0,
    resourceId: "123456",
    resourcePath: "/pay",
  },
  resource: "/pay",
};

describe("Pay", () => {
  it("should return 200", async () => {
    const result = (await handler(event)) as APIGatewayProxyResult;
    expect(result.statusCode).toEqual(200);
  });
  it("should return 400", async () => {
    const result = (await handler({ ...event, body: null })) as APIGatewayProxyResult;
    expect(result.statusCode).toEqual(400);
  });
});
