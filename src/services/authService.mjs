import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserRepository from "../repositories/UserRepository.mjs";
import Role from "../models/Role.mjs";
import { AppError } from "../utils/AppError.mjs";

// Fn para registrar un nuevo usuario
export async function register(userData) {
  console.log('authService - Datos Recibidos:', userData);
  const { username, email, password } = userData;

  // Verificamos si existe por email
  const existingByEmail = await UserRepository.getByEmail(email);

  if (existingByEmail) {
    throw new AppError("El email ya está registrado", 409);
  }

  // Verificamos si existe por username
  const existingByUsername = await UserRepository.getByUsername(username);

  if (existingByUsername) {
    throw new AppError("El nombre de usuario ya está en uso", 409);
  }

  // Encriptamos la contraseña antes de crear el usuario usando bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);

  // Buscamos el rol por defecto
  const defaultRole = await Role.findOne({ name: 'user' });
  console.log('Register - Role ➜ ', defaultRole)
  if (!defaultRole) {
    throw new AppError("Rol por defecto no encontrado", 404);
  }

  // Creamos el usuario usando el método de UserRepository
  const newUser = await UserRepository.create({
    ...userData,
    password: hashedPassword,
    role: defaultRole._id
  });

  // Respuesta al usuario
  // Convertimos el documento mongoose a un objeto plano
  const userResponse = newUser.toObject();
  // Eliminamos la contraseña por seguridad
  delete userResponse.password;

  // Generamos un token JWT para el usuario
  const token = generateToken(newUser);
  // Retornamos el usuario (sin password) y su token
  return { user: userResponse, token };

}

export async function login(identifier, password) {
  // 🔹 Buscamos por email o username
  const user =
    (await UserRepository.getByEmail(identifier)) ||
    (await UserRepository.getByUsername(identifier));

  if (!user) {
    throw new AppError("Usuario no encontrado", 404);
  }


  // 🔹 Verificamos la contraseña
  //asda87123y8
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new AppError("Usuario o contraseña incorrectos", 401);
  }


  // Convertimos el usuario a objeto plano y eliminamos la contraseña
  const userResponse = user.toObject();
  delete userResponse.password;

  // Generamos un nuevo token y retornamos la respuesta
  const token = generateToken(user);
  return { user: userResponse, token };
}

/* ──────────────────────────────────────────────────────────────────────── */

const generateToken = (user) => {
  // Creamos un token que incluye el id, rol y permisos del usuario

  /*  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c */

  return jwt.sign(
    {
      id: user._id,
      role: user.role
    },
    // Usamos la clave secreta del .env
    process.env.JWT_SECRET,
    // El token expira en 24 horas
    { expiresIn: '24h' }
  );
}