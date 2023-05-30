import {z} from 'zod';

export const Lego_Pay_Request = z.object({
  amount: z.object({
    value: z.string(),
    currency: z.string(),
  }),
  paymentMethod: z.string(),
}).strict();
export type Lego_Pay_Request = z.infer<typeof Lego_Pay_Request>;

const Lego_PaymentId = z.string();

export const Lego_Pay_Item = Lego_Pay_Request.extend({
  legoPaymentId: Lego_PaymentId,
}).strict();
export type Lego_Pay_Item = z.infer<typeof Lego_Pay_Item>;
