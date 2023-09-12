import { SQSRouter } from '../../src';
import { MyHandler } from './handlers';

const routers = [
  {
    routeType: SQSRouter,
    routeParams: {
      endpoint: 'http://localhost:4566',
      region: 'us-east-1'
    },
    handler: MyHandler,
    queueName: 'example_queue'
  }
];

export default routers;
