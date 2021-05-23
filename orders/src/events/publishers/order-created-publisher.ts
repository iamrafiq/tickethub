import {
  Publisher,
  OrderCreatedEvent,
  Subjects,
} from '@lordjs/tickethub-common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
