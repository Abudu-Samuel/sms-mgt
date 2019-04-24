export default {
  success(res, statusCode, message, payload) {
    res.status(statusCode).json({
      message,
      payload
    });
  },
  error(res, statusCode, message) {
    res.status(statusCode).json({
      message
    });
  }
};
