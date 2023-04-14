# Evolutty

[![NPM downloads](https://img.shields.io/npm/dm/evolutty.svg?style=flat)](https://www.npmjs.com/package/evolutty)
[![Build Status](https://github.com/bbc/sqs-consumer/actions/workflows/test.yml/badge.svg?branch=main)](https://github.com/paulo-tinoco/evolutty/actions/workflows/test.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/5b858ac139de92c496b9/maintainability)](https://codeclimate.com/github/paulo-tinoco/evolutty/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/5b858ac139de92c496b9/test_coverage)](https://codeclimate.com/github/paulo-tinoco/evolutty/test_coverage)

**evolutty** is an asynchronous message dispatcher for concurrent tasks processing, with the following features:

- Encourages decoupling from message providers and consumers
- Easy to extend and customize
- Easy error handling, including integration with sentry
- Easy to create one or multiple services
- Generic Handlers
- Bull integration
- AWS SQS integration

---

:information_source: Currently, BullMQ and AWS SQS is supported

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
  }
];

const manager = new EvoluttyManager(routers);
manager.start();
```

## License

**Evolutty** is [MIT](./LICENSE)

## Contributing

Please read [CONTRIBUTING.md](.github/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

- **Paulo Tinoco** - _Initial work_ - [paulo-tinoco](https://github.com/paulo-tinoco)
