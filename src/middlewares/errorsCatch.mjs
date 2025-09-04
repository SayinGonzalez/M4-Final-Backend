
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  const status = err.status || 500;
  const message = err.message || "Error interno del servidor";

  // Manejo de errores de Mongoose Validation
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message);
    message = errors.join(', ');
    status = 400;
  }

  // Manejo de errores de duplicados en MongoDB
  if (err.code && err.code === 11000) {
    const field = Object.keys(err.keyValue);
    message = `El valor de '${field}' ya existe`;
    status = 409; // Conflict
  }

  res.status(status).json({
    success: false,
    message,
    error: err.name
  });
};

export default errorHandler