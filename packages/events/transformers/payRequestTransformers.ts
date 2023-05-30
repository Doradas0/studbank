import { applyPatch, Operation } from "json-joy/es6/json-patch";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { Lego_Pay_Request } from "../schemas/Payment";

export const addLegoPaymentId = (data: Lego_Pay_Request) => {
  try {
    Lego_Pay_Request.parse(data);
    const legoPaymentId = uuidv4();
    const patch: Operation[] = [
      { op: "add", path: "/legoPaymentId", value: legoPaymentId },
    ];

    return applyPatch(data, patch, { mutate: false });
  } catch (e) {
    if (e instanceof z.ZodError) {
      console.error(e.issues);
    }
  }
};