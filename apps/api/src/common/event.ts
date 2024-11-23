import { Logger } from '@nestjs/common';
import { Message, SQS } from '@trengym/sqs';

export const createEvent = async (event: Message['transaction']) => {
  const logger = new Logger();
  const sqs = new SQS();

  await sqs.sendMessage('transaction', event);
  logger.log(
    `Event Created ${JSON.stringify(event)} at ${new Date().toISOString()}`,
  );
};
