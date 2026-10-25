declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    JWT_SECRET: string;
    NUMBER_OF_USERS: string;
    MASTER_USER: string;
    MASTER_PASSWORD: string;
  }
}
