import {
  Publisher,
  Subjects,
  TicketCreatedEvent,
} from '@lordjs/tickethub-common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
