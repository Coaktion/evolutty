import { RoutesType, SQSClientOptions, SQSRouter } from '../../src';
import { MyHandler } from './handlers';

const routers: RoutesType[] = [
  {
    routeType: SQSRouter,
    routeParams: {
      region: 'us-east-1',
      prefixBasedQueues: true,
      messageSource: 'SQS'
    } as SQSClientOptions,
    handler: MyHandler,
    queueName: 'aasdas'
  }
];

export default routers;
