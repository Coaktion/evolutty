import dotenv from 'dotenv';
import { join } from 'path';

dotenv.config({ path: join(__dirname, '../.env') });

const config = {
    bullmq: {
        connection: {
            host: 'localhost',
            port: 6379,
        },
    }
};

export default config;
