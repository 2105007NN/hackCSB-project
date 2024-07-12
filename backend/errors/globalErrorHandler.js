const globalErrorHandler = (err, req,res,next) => {
    let statusCode = 500;
    let message = 'Something went wrong!';
    let errorSources = [
      {
        path: '',
        message: 'Something went wrong',
      },
    ];

    return res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        err,
    });
}
 
export default globalErrorHandler;