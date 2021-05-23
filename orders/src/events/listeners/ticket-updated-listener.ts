import { Message } from 'node-nats-streaming';
import {
  Subjects,
  Listener,
  TicketUpdatedEvent,
} from '@lordjs/tickethub-common';
import { Ticket } from '../../models/ticket';
import { queueGroupName } from './queue-group-name';
export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
  queGroupName = queueGroupName;

  async onMessage(data: TicketUpdatedEvent['data'], msg: Message) {
    // const ticket = await Ticket.findOne({
    //   _id: data.id,
    //   version: data.version - 1, // checking linear version interpolation for mitigiting concurency issuse
    // });

    const ticket = await Ticket.findByEvent({
      id: data.id,
      version: data.version,
    });
    if (!ticket) {
      throw new Error('Ticket not found');
    }

    const { title, price } = data;
    ticket.set({ title, price });
    await ticket.save();
    msg.ack();
  }
}
