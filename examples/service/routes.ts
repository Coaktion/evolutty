import { RabbitMQRouter } from '../../src';
import { MyHandler } from './handlers';

const routers = [
  {
    routeType: RabbitMQRouter,
    routeParams: {
      username: 'guest',
      password: 'guest',
      host: 'localhost',
      port: 5672,
      vhost: '/',
      heartbeat: 10,
      protocol: 'amqp',
      locale: 'en_US',
      frameMax: 0,
      channelMax: 0,
      connectionTimeout: 10000,
      authMechanism: 'AMQPLAIN',
      ssl: {
        enabled: false,
        key: '',
        cert: '',
        ca: '',
        passphrase: ''
      },
      retry: {
        enabled: false,
        maxRetries: 10,
        minTimeout: 1000,
        maxTimeout: 10000,
        randomize: true
      },
      debug: true
    },
    handler: MyHandler,
    queueName: 'local__service_example'
  }
];

export default routers;
