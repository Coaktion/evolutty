import { SQSRouter } from '../../src';
import { MyHandler } from './handlers';

const routeParams = {
  accessKeyId: 'test',
  secretAccessKey: 'test',
  endpoint: 'http://localhost:4566',
  region: 'us-east-1',
  visibilityTimeout: 10
};

const routers = [
  {
    routeType: SQSRouter,
    routeParams,
    handler: MyHandler,
    queueName: 'local__service_example'
  },
  {
    routeType: SQSRouter,
    routeParams,
    handler: MyHandler,
    queueName: 'local__service_example_02'
  }
];

export default routers;
