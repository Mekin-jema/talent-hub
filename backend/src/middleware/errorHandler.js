const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log to console for dev
  console.error(err);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = { 
      ...error, 
      message, 
      statusCode: 404, 
      name: 'CastError' 
    };
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = { 
      ...error, 
      message, 
      statusCode: 400, 
      name: 'DuplicateKeyError' 
    };
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors)
      .map(val => val.message)
      .join(', ');
    error = { 
      ...error, 
      message, 
      statusCode: 400, 
      name: 'ValidationError' 
    };
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    const message = 'Invalid token';
    error = { 
      ...error, 
      message, 
      statusCode: 401, 
      name: 'JsonWebTokenError' 
    };
  }

  if (err.name === 'TokenExpiredError') {
    const message = 'Token expired';
    error = { 
      ...error, 
      message, 
      statusCode: 401, 
      name: 'TokenExpiredError' 
    };
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error'
  });
};

module.exports = { errorHandler };
