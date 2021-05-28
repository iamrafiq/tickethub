import {
  Subjects,
  Publisher,
  PaymentCreatedEvent,
} from '@lordjs/tickethub-common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
