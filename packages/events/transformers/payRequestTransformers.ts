import { TransformOperation, transform } from "./brickPatch";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { Lego_Pay_Request, TLego_Pay_Request } from "../schemas/Pay";

export const addLegoPaymentId = (data: TLego_Pay_Request) => {
  try {
    Lego_Pay_Request.parse(data);
    const legoPaymentId = uuidv4();
    const patch: TransformOperation[] = [
      { op: "add", path: "/legoPaymentId", value: legoPaymentId },
    ];

    const result = transform(data, patch);
    return result;
  } catch (e) {
    if (e instanceof z.ZodError) {
      console.error(e.issues);
    }
  }
};
