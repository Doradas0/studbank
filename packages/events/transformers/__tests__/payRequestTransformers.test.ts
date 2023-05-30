import { addLegoPaymentId } from "../payRequestTransformers";
import { Lego_Pay_Request, Lego_Pay_Item } from "../../schemas/Payment";

describe("payRequestTransformers", () => {
  it("should add legoPaymentId", () => {
    const data: Lego_Pay_Request = {
      amount: {
        value: "10.00",
        currency: "EUR",
      },
      paymentMethod: "ideal",
    };

    let validation = Lego_Pay_Item.safeParse(data);
    expect(validation.success).toBe(false);

    const result = addLegoPaymentId(data);

    expect(result?.doc).toEqual({
      amount: {
        value: "10.00",
        currency: "EUR",
      },
      paymentMethod: "ideal",
      legoPaymentId: expect.any(String),
    });

    validation = Lego_Pay_Item.safeParse(result?.doc);
    expect(validation.success).toBe(true);
  })
});
