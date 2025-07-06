// import { config } from "dotenv";

// config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

// export const { PORT, NODE_ENV, DB_URI, JWT_SECRET, JWT_EXPIRES_IN } =
//   process.env;

import { config } from "dotenv";

config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

if (!process.env.PORT) {
  throw new Error("PORT is not defined in environment variables");
}
if (!process.env.NODE_ENV) {
  throw new Error("NODE_ENV is not defined in environment variables");
}
if (!process.env.DB_URI) {
  throw new Error("DB_URI is not defined in environment variables");
}
if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}
if (!process.env.JWT_EXPIRES_IN) {
  throw new Error("JWT_EXPIRES_IN is not defined in environment variables");
}

export const PORT = process.env.PORT;
export const NODE_ENV = process.env.NODE_ENV;
export const DB_URI = process.env.DB_URI;
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
