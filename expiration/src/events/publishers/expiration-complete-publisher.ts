import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from '@lordjs/tickethub-common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
