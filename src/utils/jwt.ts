// import jwt from "jsonwebtoken";
// import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";

// export const generateToken = (payload: object): string => {
//   return jwt.sign(payload, JWT_SECRET as string, {
//     expiresIn: JWT_EXPIRES_IN,
//   });
// };

import jwt from "jsonwebtoken";

export const generateToken = (payload: object) => {
  const secret = process.env.JWT_SECRET as string;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }

  return jwt.sign(payload, secret, { expiresIn: "7d" });
};
