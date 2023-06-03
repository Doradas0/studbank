import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

//Schema definition & validation object for runtime checks
export const Lego_Pay_Request = z
  .object({
    amount: z.object({
      value: z.string(),
      currency: z.string()
    }),
    paymentMethod: z.string(),
    country: z.string().optional(),
  })
  //strict() is used to ensure that no extra fields are allowed
  .strict()
  //description is used to generate documentation in json-schema
  .describe("Request parameters for Lego /pay endpoint");
//Type definition for IDE support
export type TLego_Pay_Request = z.infer<typeof Lego_Pay_Request>;
//JSON Schema definition for documentation and api models
export const Lego_Pay_Request_Schema = zodToJsonSchema(Lego_Pay_Request);

const Lego_PaymentId = z.string();

export const Lego_Pay_Item = Lego_Pay_Request.extend({
  legoPaymentId: Lego_PaymentId,
})
  .strict()
  .describe("Stored object for Lego /pay item");
export type TLego_Pay_Item = z.infer<typeof Lego_Pay_Item>;
export const Lego_Pay_Item_Schema = zodToJsonSchema(Lego_Pay_Item);
