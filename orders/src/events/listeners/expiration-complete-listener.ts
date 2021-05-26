import { Message } from 'node-nats-streaming';
import {
  Subjects,
  Listener,
  ExpirationCompleteEvent,
  OrderStatus,
} from '@lordjs/tickethub-common';
import { Order } from '../../models/order';
import { queueGroupName } from './queue-group-name';
import { OrderCancelledPublisher } from '../publishers/order-cancelled-publisher';
import { Ticket } from '../../models/ticket';
export class ExpirationCompleteListener extends Listener<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
  queueGroupName = queueGroupName;

  async onMessage(data: ExpirationCompleteEvent['data'], msg: Message) {
    // Affter Reciving Expiration Completed Event finding associted order
    const order = await Order.findById(data.orderId).populate('ticket');
    if (!order) {
      throw new Error('Order Not found');
    }
    // setting that order is cancelled
    order.set({
      status: OrderStatus.Cancelled,
    });
    //saving the order
    await order.save();
    // now order is cancel, let otehr services know that, such as Ticket, Payment, ... etc
    await new OrderCancelledPublisher(this.client).publish({
      id: order.id,
      version: order.version,
      ticket: {
        id: order.ticket.id,
      },
    });

    msg.ack();
  }
}
