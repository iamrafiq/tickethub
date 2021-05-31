import { Message } from 'node-nats-streaming';
import {
  Subjects,
  Listener,
  PaymentCreatedEvent,
  OrderStatus,
} from '@lordjs/tickethub-common';
import { Order } from '../../models/order';
import { queueGroupName } from './queue-group-name';

export class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: PaymentCreatedEvent['data'], msg: Message) {
    // Affter Reciving Expiration Completed Event finding associted order
    const order = await Order.findById(data.orderId);
    if (!order) {
      throw new Error('Order Not found');
    }

    // setting that order is cancelled
    order.set({
      status: OrderStatus.Complete,
    });
    //saving the order
    await order.save();

    // TODO: we can publish an event to notficatin service that an order successfully created
    // for a user.

    msg.ack();
  }
}
