import {
  Publisher,
  Subjects,
  TicketUpdatedEvent,
} from '@lordjs/tickethub-common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
