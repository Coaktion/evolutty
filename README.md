# Evolutty

![npm](https://img.shields.io/npm/dm/@coaktion/evolutty)
[![Build Status](https://github.com/bbc/sqs-consumer/actions/workflows/test.yml/badge.svg?branch=main)](https://github.com/paulo-tinoco/evolutty/actions/workflows/test.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/5b858ac139de92c496b9/maintainability)](https://codeclimate.com/github/paulo-tinoco/evolutty/maintainability)
![Code Climate coverage](https://img.shields.io/codeclimate/coverage/paulo-tinoco/evolutty)

**evolutty** is an asynchronous message dispatcher for concurrent tasks processing, with the following features:

- Encourages decoupling from message providers and consumers
- Easy to extend and customize
- Easy error handling, including integration with sentry
- Easy to create one or multiple services
- Generic Handlers
- Bull integration
- AWS SQS integration
- RabbitMQ integration

---

:information_source: Currently, BullMQ, RabbitMQ and AWS SQS are supported

## Installation

```bash
npm i @coaktion/evolutty
```

## Usage

```typescript
import {
  BullMQHandler,
  BullMQRouter,
  EvoluttyManager,
  RabbitMQHandler,
  RabbitMQRouter,
  SQSHandler,
  SQSRouter
} from '@coaktion/evolutty';

export class MyBullHandler extends BullMQHandler {
  async handle(content: object, metadata: object): Promise<boolean> {
    // code here
    return true;
  }
}

export class MySQSHandler extends SQSHandler {
  async handle(content: object, metadata: object): Promise<boolean> {
    // code here
    return true;
  }
}

export class MyRabbitMQHandler extends RabbitMQHandler {
  async handle(content: object, metadata: object): Promise<boolean> {
    // code here
    return true;
  }
}

const routers = [
  {
    routeType: BullMQRouter,
    handler: MyBullHandler,
    queueName: 'my_queue_bull'
  },
  {
    routeType: SQSRouter,
    handler: MySQSHandler,
    routeParams: {
      accessKeyId: 'test',
      secretAccessKey: 'test',
      region: 'us-east-1',
      visibilityTimeout: 10
    },
    queueName: 'my_queue_sqs'
  },
  {
    routeType: RabbitMQRouter,
    handler: MyRabbitMQHandler,
    queueName: 'my_queue_rabbitmq',
    routeParams: {
      username: 'rabbit_user',
      password: '*******',
      debug: true
    }
  }
];


const manager = new EvoluttyManager(routers);
manager.start();
```

### Observations

- The **queueName** option is used as a prefix to fetch queues when the **prefixBasedQueues** option is equals to true on **SQS** route params (default is false)

- You can also customize the logger by setting the environment variables in `local.env` file:

```bash
LOG_LEVEL=debug # default is info
LOG_FILE_PATH=my_app.log # file that will store the logs if LOG_TRANSPORTS contains file
LOG_TRANSPORTS=console,file # comma separated values (currently only console and file are supported)
LOG_FORMAT=json # json or simple
```

## License

**Evolutty** is [MIT](./LICENSE)

## Contributing

Please read [CONTRIBUTING.md](.github/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

- **Paulo Tinoco** - _Initial work_ - [paulo-tinoco](https://github.com/paulo-tinoco)
