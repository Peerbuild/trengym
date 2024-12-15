import { smsMessageSchema } from '@trengym/sqs'
import { type SQSHandler } from 'aws-lambda'
import twilio from 'twilio'

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN

const client = twilio(accountSid, authToken)

export const handler: SQSHandler = async (event) => {
  for (const message of event.Records) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- safeParse is safe
      const body = JSON.parse(message.body)
      console.log('Message received in SMS Service:', message.body)

      const { success, data } = smsMessageSchema.safeParse(body)

      if (!success) {
        console.error('Invalid message:', body)
        continue
      }

      const response = await client.verify.v2
        .services('VA835611453c0e452a7b9a9557ec945978')
        .verifications.create({
          channel: 'sms',
          to: data.recipient.phoneNumber
        })

      console.log('Message sent:', response)
    } catch (error) {
      console.error('Error processing message:', error)
      continue
    }
  }
}
