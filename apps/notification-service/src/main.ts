import { type SQSHandler } from 'aws-lambda'
import {
  transactionMessageSchema,
  isEmailMessage,
  isSmsMessage,
  SQS
} from '@trengym/sqs'

export const handler: SQSHandler = async (event) => {
  const sqs = new SQS()
  for (const message of event.Records) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- safeParse is safe
    const body = JSON.parse(message.body)
    const { success, data, error } = transactionMessageSchema.safeParse(body)
    console.log('Message received in Notification Service:', message.body)

    if (!success) {
      console.error('Invalid message:', body, error)
      return
    }

    switch (true) {
      case isEmailMessage(data):
        // Send to Email Service
        console.log('Sending email to:', data.recipient.email)
        break
      case isSmsMessage(data):
        // Send to SMS Service
        console.log('Sending SMS to:', data.recipient.phoneNumber)
        await sqs.sendMessage('sms', data)
        break
      default:
        console.error('Unknown message type:', data)
    }
  }
}
