import nats from 'node-nats-streaming';

console.clear();
/**
 * client_id: unique id from kubernets or random string
 */
const stan = nats.connect('ticketing', 'client_id', {
  url: 'http://localhost:4223',
});

stan.on('connect', () => {
  console.log('Publisher connected to NATS');
  const data = JSON.stringify({
    id: '123',
    title: 'concert',
    price: 20,
  });

  stan.publish('ticket:created', data, () => {
    console.log('Event published');
  });
});
