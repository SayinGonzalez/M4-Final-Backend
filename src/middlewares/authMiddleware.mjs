
import jwt from "jsonwebtoken";
import { AppError } from "../utils/AppError.mjs";
import UserRepository from "../repositories/UserRepository.mjs";


// Middleware para verificar el token de autenticación
export const authenticateToken = (req, res, next) => {

  console.log('INGRESO authenticateToken')

  // Obtenemos el header de autorización
  const authHeader = req.headers['authorization'];
  // Extraemos el token del header (formato: "Bearer <token>")
  const token = authHeader && authHeader.split(' ')[1];

  // Si no hay token, devolvemos error 401 (No autorizado)
  if (!token) {
    throw new AppError('Token no proporcionado', 401);
  }

  try {
    // Verificamos el token usando la clave secreta
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Guardamos la información del usuario decodificada en el objeto request
    req.user = decoded;
    // console.log('authenticateToken req.user', req.user)
    // Continuamos con la siguiente función middleware
    next();
  } catch (error) {
    // Si el token es inválido, devolvemos error 403 (Prohibido)
    throw new AppError('Token inválido', 403);

  }

};



export const hasPermission = (actions = [], resources = []) => {
  console.log('INGRESO hasPermission')
  return async (req, res, next) => {
    try {
      if (!req.user) {
        throw new AppError('No autenticado', 401);
      }
      // console.log('hasPermission req.user', req.user)
      
      // Obtener usuario con rol y permisos populados
      const user = await UserRepository.getById(req.user.id);
      // console.log('hasPermission user', user)
      

      if (!user.role) {
        throw new AppError("Rol no asignado", 403);
      }

      // const hasPermission = user.role.permissions.some(
      //   permission => permission.name === requiredPermission
      // );

      // Para una sola acción con un solo recurso
      // const hasPermission = 
      //   rolePermissions[action] &&
      //   rolePermissions[action].includes(resource);
      const rolePermissions = user.role.permissions;
      const hasPermission = actions.some(
        (action) =>
          rolePermissions[action] &&
          resources.some((resource) => rolePermissions[action].includes(resource))
      );

      if (!hasPermission) {
        throw new AppError('No tienes permiso para realizar esta acción', 403);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
