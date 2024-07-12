import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';
// import { User } from '../modules/User/user.model';
import catchAsync from '../utils/catchAsync';


const auth = (...requiredRoles) => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;

    // Checking if the token is missing
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    // Checking if the given token is valid
    const decoded = jwt.verify(token, config.jwt_access_secret);
    const { role, userId } = decoded;

    // // Checking if the user's password has been changed after the token was issued
    // if (
    //   user.passwordChangedAt &&
    //   User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat)
    // ) {
    //   throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    // }

    // Checking if the user has the required role
    if (requiredRoles.length > 0 && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    req.user = { ...decoded, role };
    next();
  });
};

module.exports = auth;
