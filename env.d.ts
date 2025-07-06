declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    NODE_ENV: string;
    DB_URI: string;
    JWT_SECRET: string;
    JWT_EXPIRES_IN: string;
  }
}
