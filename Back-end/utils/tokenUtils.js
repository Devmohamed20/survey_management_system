import jwt from "jsonwebtoken";

export const createJwt = (payload) => {
  const token = jwt.sign(payload, process.env.SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};
