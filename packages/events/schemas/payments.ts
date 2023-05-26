export const Lego_Pay_Request = {
  $schema: "http://json-schema.org/draft/2020-12/schema",
  $id: "https://TODO.com/person.schema.json",
  title: "Lego_Pay_Request",
  description: "Expected event from all clients making making a pay request",
  type: "object",
  properties: {
    amount: {
      description: "The amount to be paid",
      type: "object",
      properties: {
        currency: {
          description: "The currency of the amount",
          type: "string",
        },
        value: {
          description: "The value of the payment, without decimal places",
          type: "integer",
        },
      },
    },
    payment_method: {
      description: "The payment method to be used",
      type: "string",
    },
  },
  required: ["amount", "payment_method"],
};
