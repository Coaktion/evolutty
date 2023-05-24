import { RabbitMQRouter } from '../../src';
import { MyHandler } from './handlers';

const routers = [
  {
    routeType: RabbitMQRouter,
    routeParams: {
      username: 'user',
      password: 'password',
      host: 'localhost',
      port: 5672,
      vhost: '/',
      heartbeat: 10,
      protocol: 'amqp',
      locale: 'en_US',
      frameMax: 0,
      channelMax: 0
    },
    handler: MyHandler,
    queueName: 'local__service_example'
  }
];

export default routers;
