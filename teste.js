const bullmq = require('bullmq');

const queue = new bullmq.Queue('myQueue');

queue.add('myJob', { foo: 'teste' });

queue.close();
