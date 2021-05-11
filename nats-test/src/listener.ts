import nats, { Message } from 'node-nats-streaming';
import { randomBytes } from 'crypto';
console.clear();
/**
 * client_id: unique id from kubernets or random string
 * for now we
 */
const clientId = randomBytes(4).toString('hex');
const stan = nats.connect('ticketing', clientId, {
  url: 'http://localhost:4223',
});

stan.on('connect', () => {
  console.log('Listener connected to NATS');

  const options = stan.subscriptionOptions().setManualAckMode(true);
  /**
   * ticket:created: chennel
   * listenerQueueGrop: if there more then one process of listener is running then they all added to listenerQueueGrop and
   *                    only one member of listenerQueueGrop will receive the event
   *
   */
  const subscription = stan.subscribe(
    'ticket:created',
    'listenerQueueGrop',
    options
  );
  subscription.on('message', (msg: Message) => {
    const data = msg.getData();
    if (typeof data === 'string') {
      console.log(`Received event # ${msg.getSequence()}, with data: ${data}`);
    }
    msg.ack();
  });
});
