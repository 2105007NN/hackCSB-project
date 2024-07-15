import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import AppError from '../errors/AppError.js';
import catchAsync from '../utils/catchAsync.js';

const jwt_access_secret = process.env.JWT_ACCESS_SECRET;

const auth = (...requiredRoles) => {
  return catchAsync(async (req, res, next) => {
      const token = req.headers.authorization.split(' ')[1];
      // console.log(token[1]);
      // Checking if the token is missing

      if (!token) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
      }
      const cleanedToken = token.replace(/^"|"$/g, '');
      console.log(cleanedToken);
      // Checking if the given token is valid
      const decoded = jwt.verify(cleanedToken, jwt_access_secret);
      const { role, userId } = decoded;

      // Checking if the user has the required role
      if (requiredRoles.length > 0 && !requiredRoles.includes(role)) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
      }

      req.user = { ...decoded, role };
      next();
  });
};


export default auth;