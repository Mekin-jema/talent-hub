const sendSuccessResponse = (res, message, data, statusCode = 200, pagination) => {
  const response = {
    success: true,
    message,
    data
  };

  if (pagination) {
    response.pagination = pagination;
  }

  res.status(statusCode).json(response);
};

const sendErrorResponse = (res, message, statusCode = 500, error) => {
  const response = {
    success: false,
    message
  };

  if (process.env.NODE_ENV === 'development' && error) {
    response.error = error;
  }

  res.status(statusCode).json(response);
};

module.exports = { sendSuccessResponse, sendErrorResponse };
