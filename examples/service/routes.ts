import BullMQRouter from '../../src/ext/bullmq/routes';
import MyHandler from './handlers';

const routers = [
  {
    routeType: BullMQRouter,
    handler: MyHandler,
    queueName: 'myQueue'
  }
];

export default routers;
