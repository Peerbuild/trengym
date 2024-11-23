import {
  QueueNameExists,
  SendMessageCommand,
  SQSClient,
} from "@aws-sdk/client-sqs";
import { z } from "zod";
import { fromIni } from "@aws-sdk/credential-providers";

const baseQueueUrl = "https://sqs.eu-west-3.amazonaws.com/767397681312/";

const accountConfirmationSchema = z.object({
  eventType: z.literal("accountConfirmation"),
  recipient: z.object({
    email: z.string().email(),
  }),
  variables: z.object({
    name: z.string(),
  }),
});

const smsVerificationSchema = z.object({
  eventType: z.literal("smsVerification"),
  recipient: z.object({
    phoneNumber: z.string(),
  }),
  variables: z.object({
    code: z.string(),
  }),
});

const emailMessageSchema = z.discriminatedUnion("eventType", [
  accountConfirmationSchema,
]);
type EmailMessageType = z.infer<typeof emailMessageSchema>;

const smsMessageSchema = z.discriminatedUnion("eventType", [
  smsVerificationSchema,
]);
type SmsMessageType = z.infer<typeof smsMessageSchema>;

const queue = {
  transaction: `${baseQueueUrl}transactionQueue.fifo`,
  email: `${baseQueueUrl}emailQueue.fifo`,
};

type QueueType = keyof typeof queue;

export interface Message extends Record<QueueType, any> {
  transaction: EmailMessageType | SmsMessageType;
  email: EmailMessageType;
  sms: SmsMessageType;
}

export class SQS {
  private client: SQSClient;
  constructor() {
    this.client = new SQSClient({
      credentials: fromIni({
        profile: "trengym",
      }),
      region: "eu-west-3",
    });
  }

  async sendMessage<T extends QueueType>(queueName: T, message: Message[T]) {
    const command = new SendMessageCommand({
      QueueUrl: queue[queueName],
      MessageBody: JSON.stringify(message),
      MessageGroupId: "default-group",
      MessageDeduplicationId: new Date().getTime().toString(),
    });

    await this.client.send(command);
  }
}
