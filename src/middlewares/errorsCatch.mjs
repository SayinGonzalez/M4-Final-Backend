
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  const status = err.status || 500;
  res.status(status).json({
    success: false,
    message: err.message || "Error interno del servidor",
    error: err.name
  });
};

export default errorHandler