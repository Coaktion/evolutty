import { config as dotenvConfig } from 'dotenv';
import { join } from 'path';

dotenvConfig({ path: join(__dirname, '../.env') });

const config = {
    bullmq: {
        connection: {
            host: 'localhost',
            port: 6379,
        },
    }
};

export default config;
