import { disconnect, setCache } from "@trengym/redis";
import { smsMessageSchema } from "@trengym/sqs";
import { SQSHandler } from "aws-lambda";
import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

export const handler: SQSHandler = async (event) => {
  for (const message of event.Records) {
    try {
      const body = JSON.parse(message.body);
      console.log("Message received in SMS Service:", message.body);

      const { success, data } = smsMessageSchema.safeParse(body);

      if (!success) {
        console.error("Invalid message:", body);
        continue;
      }

      const response = await client.verify.v2
        .services("VA835611453c0e452a7b9a9557ec945978")
        .verifications.create({
          channel: "sms",
          to: data.recipient.phoneNumber,
        });

      console.log("Message sent:", response);

      await setCache(
        "verificationToken",
        data.recipient.phoneNumber,
        response.sid
      );
    } catch (error) {
      console.error("Error processing message:", error);
      continue;
    }
  }

  await disconnect();
};
