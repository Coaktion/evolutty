import * as dotenv from 'dotenv';

dotenv.config();

const config = {
    bullmq: {
        connection: {
            host: process.env.REDIS_HOST,
            port: parseInt(process.env.REDIS_PORT),
            username: process.env.REDIS_USERNAME,
            password: process.env.REDIS_PASSWORD,
        },
        concurrency: parseInt(process.env.BULLMQ_CONCURRENCY) || 1,
    },
    sqs: {
        region: process.env.AWS_REGION,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        endpointUrl: process.env.AWS_ENDPOINT_URL,
        accountNumber: process.env.AWS_ACCOUNT_ID,
        batchSize: parseInt(process.env.SQS_BATCH_SIZE) || 10,
        visibilityTimeout: parseInt(process.env.SQS_VISIBILITY_TIMEOUT) || 30,
        waitTimeSeconds: parseInt(process.env.SQS_WAIT_TIME_SECONDS) || 20,
        authenticationErrorTimeout: parseInt(process.env.SQS_AUTHENTICATION_ERROR_TIMEOUT) || 10000,
    },
};

export default config;
