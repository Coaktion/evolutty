export type RabbitMQClientOptions = {
  username: string;
  password: string;
  host: string;
  port: number;
  vhost: string;
  heartbeat: number;
  protocol: string;
  locale: string;
  frameMax: number;
  channelMax: number;
  connectionTimeout: number;
  authMechanism: string;
  ssl: {
    enabled: boolean;
    key: string;
    cert: string;
    ca: string;
    passphrase: string;
  };
  retry: {
    enabled: boolean;
    maxRetries: number;
    minTimeout: number;
    maxTimeout: number;
    randomize: boolean;
  };
  debug: boolean;
};

export type TranslateRabbitMQ = {
  content: object;
  metadata: {
    fields: object;
    properties: object;
    token: string;
  };
};
