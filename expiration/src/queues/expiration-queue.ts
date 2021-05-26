import Queue from 'bull';

interface Payload {
  orderId: string;
}

const expiationQueue = new Queue<Payload>('order:expiration', {
  redis: {
    host: process.env.REDIS_HOST, // look at expiration-depl.yaml
  },
});

expiationQueue.process(async (job) => {
  console.log('Expiries order id', job.data.orderId);
});

export { expiationQueue };
