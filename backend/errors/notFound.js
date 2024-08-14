import httpStatus from 'http-status';
import sendResponse from '../utils/sendResponse.js';

const notFound = (req, res, next) => {
  // return res.status(httpStatus.NOT_FOUND).json({
  //   success: false,
  //   message: 'API Not Found !!',
  //   error: '',
  // });

  sendResponse(res,{
    statusCode: httpStatus.NOT_FOUND,
    success : false,
    message: "API Not Found !!",
    error : ''
  })
};

export default notFound;
