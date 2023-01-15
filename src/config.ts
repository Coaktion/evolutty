import * as dotenv from 'dotenv';

dotenv.config();

const config = {
  /**
   * BullMQ Worket Configuration
   * @see https://api.docs.bullmq.io/interfaces/WorkerOptions.html
   * @see https://api.docs.bullmq.io/classes/Worker.html
   * @see https://api.docs.bullmq.io/classes/Queue.html
   */
  bullmq: {
    /**
     * Connection Options
     * @see https://api.docs.bullmq.io/types/ConnectionOptions.html
     * @see https://docs.redis.com/latest/rs/references/client_references/client_ioredis/
     */
    connection: {
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT),
      username: process.env.REDIS_USERNAME,
      password: process.env.REDIS_PASSWORD
    },
    /**
     * Concurrent Jobs to process
     * @see https://api.docs.bullmq.io/interfaces/WorkerOptions.html#concurrency
     * @see https://docs.bullmq.io/guide/workers/concurrency
     */
    concurrency: parseInt(process.env.BULLMQ_CONCURRENCY) || 1
  }
};

export default config;
