const globalErrorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong';
  let errorSources = err.errors || [
      {
          path: '',
          message: 'An unexpected error occurred',
      },
  ];

  // Log the error details for debugging purposes
  console.error('Error:', err);

  // For detailed error information
  let errorDetails = {
      name: err.name || 'Error',
      message: err.message,
      stack: err.stack,
      statusCode: err.statusCode,
      errors: err.errors,
  };

  // Conditionally include stack trace based on the environment
  if (process.env.NODE_ENV !== 'production') {
      errorDetails.stack = err.stack;
  }

  return res.status(statusCode).json({
      success: false,
      message,
      errorSources,
      error: errorDetails,
  });
};

export default globalErrorHandler;
