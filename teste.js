const sqsConsumer = require('sqs-consumer');
const SQSClient = require('@aws-sdk/client-sqs');


const app = sqsConsumer.Consumer.create({
  queueUrl: 'https://sqs.us-east-1.amazonaws.com/318318616248/teste__tinoco',
  region: 'us-east-1',
  attributeNames: ['All'],
  messageAttributeNames: ['All'],
  batchSize: 10,
  visibilityTimeout: 60,
  waitTimeSeconds: 20,
  handleMessage: async message => {
    console.log(message);
  },
  sqs: new SQSClient.SQSClient({
    region: 'us-east-1',
    credentials: {
      accessKeyId: 'AKIAUUHKET24DY6WVBFI',
      secretAccessKey: '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',
    },
    endpoint: '' || undefined,
  }),
});

app.on('error', err => {
  console.error(err.message);
  app.stop();
});

app.on('processing_error', err => {
  console.error(err.message);
});

console.log(app);

app.start();
