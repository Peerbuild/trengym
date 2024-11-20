import { SQSHandler } from "aws-lambda";

export const handler: SQSHandler = (event, context) => {
  for (const message of event.Records) {
    console.log("Message received:", message.body);
  }
};
