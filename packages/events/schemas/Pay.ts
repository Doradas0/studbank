import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

export const Lego_Pay_Request = z
  .object({
    amount: z.object({
      value: z.string(),
      currency: z.string(),
    }),
    paymentMethod: z.string(),
  })
  .strict()
  .describe("Request parameters for Lego /pay endpoint");
export type Lego_Pay_Request = z.infer<typeof Lego_Pay_Request>;
export const Lego_Pay_Request_Schema = zodToJsonSchema(Lego_Pay_Request);

const Lego_PaymentId = z.string();

export const Lego_Pay_Item = Lego_Pay_Request.extend({
  legoPaymentId: Lego_PaymentId,
})
  .strict()
  .describe("Stored object for Lego /pay item");
export type Lego_Pay_Item = z.infer<typeof Lego_Pay_Item>;
export const Lego_Pay_Item_Schema = zodToJsonSchema(Lego_Pay_Item);
