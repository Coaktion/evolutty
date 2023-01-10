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
    }
};

export default config;
