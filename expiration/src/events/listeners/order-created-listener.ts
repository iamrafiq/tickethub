import {
  Listener,
  OrderCreatedEvent,
  Subjects,
} from '@lordjs/tickethub-common';
import { queueGroupName } from './queue-group-name';
import { Message } from 'node-nats-streaming';
import { expiationQueue } from '../../queues/expiration-queue';
export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    // delay = expiredTime - currentTime
    const delay = new Date(data.expiresAt).getTime() - new Date().getTime();
    // console.log("delay", delay)
    await expiationQueue.add(
      {
        orderId: data.id,
      },
      {
        delay,
      }
    );

    msg.ack();
  }
}
