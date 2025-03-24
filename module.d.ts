declare namespace NodeJS {
    export interface ProcessEnv {
      NODE_ENV: string;
      PORT: number;
      FRONTEND_URL: string;
      EMAIL_SMTP: string;
      EMAIL_SMTP_TO_DEVELOPMENT: string;
    }
  }