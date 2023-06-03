import { addLegoPaymentId } from "../payRequestTransformers";
import {
  TLego_Pay_Request,
  Lego_Pay_Request_Schema,
  Lego_Pay_Item,
  Lego_Pay_Item_Schema,
} from "../../schemas/Pay";

describe("payRequestTransformers", () => {
  it("should add legoPaymentId", () => {
    const data: TLego_Pay_Request = {
      amount: {
        value: "10.00",
        currency: "EUR",
      },
      paymentMethod: "ideal",
    };

    let validation = Lego_Pay_Item.safeParse(data);
    expect(validation.success).toBe(false);

    const result = addLegoPaymentId(data);

    expect(result).toEqual({
      amount: {
        value: "10.00",
        currency: "EUR",
      },
      paymentMethod: "ideal",
      legoPaymentId: expect.any(String),
    });

    validation = Lego_Pay_Item.safeParse(result);
    expect(validation.success).toBe(true);
  });
});

it("should have json schemas", () => {
  console.log(Lego_Pay_Request_Schema);
  console.log(Lego_Pay_Item_Schema);
});
