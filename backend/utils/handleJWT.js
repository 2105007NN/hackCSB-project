import jwt from 'jsonwebtoken';

export const createToken = (jwtPayload, secret, expiresIn) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};

export const verifyToken = (token, secret) => {
  console.log(token);
  return jwt.verify(token, secret);
};
