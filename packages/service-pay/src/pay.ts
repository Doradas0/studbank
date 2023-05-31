import { Logger } from "@aws-lambda-powertools/logger";
import { Lego_Pay_Request, Lego_Pay_Item } from "../../events/schemas/Pay";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { addLegoPaymentId } from "../../events/transformers/payRequestTransformers";

const logger = new Logger();

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "No body provided",
      }),
    };
  }
  logger.debug("Received event", { event });
  const payRequest = JSON.parse(event.body);

  try {
    const parsedPayRequest = Lego_Pay_Request.parse(payRequest);
    logger.info("Parsed pay request", { parsedPayRequest });
    const payItem = addLegoPaymentId(parsedPayRequest);
    const parsedPayItem = Lego_Pay_Item.parse(payItem);
    logger.info("Parsed pay item", { parsedPayItem });

    return {
      statusCode: 200,
      body: JSON.stringify(parsedPayItem),
    };
  } catch (error) {
    logger.error("Error parsing pay request", { error });
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};
