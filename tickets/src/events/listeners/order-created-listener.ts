import { Message } from 'node-nats-streaming';
import {
  Listener,
  OrderCreatedEvent,
  Subjects,
} from '@lordjs/tickethub-common';
import { queueGroupName } from './queue-group-name';
import { Ticket } from '../../models/ticket';
import { TicketUpdatedPublisher } from '../publishers/ticket-update-publisher';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName: string = queueGroupName;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    // Find the ticket that the order is reserving
    const ticket = await Ticket.findById(data.ticket.id);

    // if no ticket throw error
    if (!ticket) {
      throw new Error('Ticket not found');
    }

    // Mark the ticket as being reserved by settings it's orderId property
    ticket.set({ orderId: data.id });

    //Save the ticket
    await ticket.save();
    //Inside order created listener we are updating primary/main table for Tickets among the services
    //If a primary table row has a update then we need to publish associted event so other service will
    //know that an ticket from primary table has changed.
    // we are awaiting because if promise fails then it will throw error,  msg.ack() will not called
    await new TicketUpdatedPublisher(this.client).publish({
      id: ticket.id,
      price: ticket.price,
      title: ticket.title,
      userId: ticket.userId,
      orderId: ticket.orderId,
      version: ticket.version,
    });
    //ack the message
    msg.ack();
  }
}
