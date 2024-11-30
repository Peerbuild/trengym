import { SendMessageCommand, SQSClient } from '@aws-sdk/client-sqs'
import { z } from 'zod'
import { fromIni } from '@aws-sdk/credential-providers'

const baseQueueUrl =
  'https://sqs.eu-west-3.amazonaws.com/767397681312/notification-service-dev-'

export const accountConfirmationSchema = z.object({
  eventType: z.literal('accountConfirmation'),
  recipient: z.object({
    email: z.string().email()
  }),
  variables: z.object({
    name: z.string()
  })
})

export const smsVerificationSchema = z.object({
  eventType: z.literal('smsVerification'),
  recipient: z.object({
    phoneNumber: z.string()
  }),
  variables: z.object({
    code: z.string()
  })
})

export const isEmailMessage = (
  message: z.infer<typeof transactionMessageSchema>
): message is EmailMessageType => {
  const { success } = emailMessageSchema.safeParse(message)
  return success
}

export const isSmsMessage = (
  message: z.infer<typeof transactionMessageSchema>
): message is SmsMessageType => {
  const { success } = smsMessageSchema.safeParse(message)
  return success
}

export const emailMessageSchema = z.discriminatedUnion('eventType', [
  accountConfirmationSchema
])
type EmailMessageType = z.infer<typeof emailMessageSchema>

export const smsMessageSchema = z.discriminatedUnion('eventType', [
  smsVerificationSchema
])
type SmsMessageType = z.infer<typeof smsMessageSchema>

export const transactionMessageSchema = z.union([
  emailMessageSchema,
  smsMessageSchema
])

export interface Message {
  transaction: z.infer<typeof transactionMessageSchema>
  email: EmailMessageType
  sms: SmsMessageType
}

export type BaseQueueUrl =
  `https://sqs.${string}.amazonaws.com/${string}/notification-service-dev-`

export type FifoQueueUrl<T extends string> = `${BaseQueueUrl}${T}Queue.fifo`

export type QueueConfig = {
  [K in keyof Message]: FifoQueueUrl<K>
}

export const queue: QueueConfig = {
  transaction: `${baseQueueUrl}transactionQueue.fifo`,
  email: `${baseQueueUrl}emailQueue.fifo`,
  sms: `${baseQueueUrl}smsQueue.fifo`
}

export class SQS {
  private client: SQSClient
  constructor() {
    this.client = new SQSClient({
      credentials: fromIni({
        profile: 'trengym'
      }),
      region: 'eu-west-3'
    })
  }

  async sendMessage<T extends keyof Message>(
    queueName: T,
    message: Message[T]
  ): Promise<void> {
    const command = new SendMessageCommand({
      QueueUrl: queue[queueName],
      MessageBody: JSON.stringify(message),
      MessageGroupId: 'default-group',
      MessageDeduplicationId: new Date().getTime().toString()
    })

    await this.client.send(command)
  }
}
