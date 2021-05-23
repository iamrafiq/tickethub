import {
  Publisher,
  OrderCancelledEvent,
  Subjects,
} from '@lordjs/tickethub-common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
