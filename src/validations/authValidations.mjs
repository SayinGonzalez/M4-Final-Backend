import { body } from 'express-validator';

// --- Array de middlewares ---

// Sign Up
export const registerValidation = [

  body('username')
    .trim()
    .notEmpty().withMessage('El usuario es requerido')
    .isLength({ min: 3, max: 20 }).withMessage("Debe tener entre 3 y 20 caracteres"),

  body('email')
    .trim()
    .notEmpty().withMessage('El email es requerido')
    .isEmail().withMessage('Email inválido')
    .normalizeEmail(),

  body('password')
    .trim()
    .notEmpty().withMessage('La contraseña es requerida')
    .isStrongPassword({
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
    })
    .withMessage("Debe tener al menos una mayúscula, una minúscula y un número")
];

// Sign In
export const loginValidation = [
  body("identifier")
    .trim()
    .notEmpty().withMessage("Debes ingresar tu usuario o correo electrónico")
    // Sanitize: trim siempre; si parece email lo normalizamos a minúsculas
    .customSanitizer((value) => {
      return value.includes("@") ? value.toLowerCase() : value;
    })
    // Validación: debe ser email válido o username válido
    .custom((value) => {
      const isEmail = /\S+@\S+\.\S+/.test(value); // simple email check
      const isUsername = /^(?![.-])(?!.*[.-]{2})[a-zA-Z0-9._-]{3,20}(?<![.-])$/.test(value); // ajustar regla según prefieras
      if (!isEmail && !isUsername) {
        throw new Error(
          "Email o usuario inválido (3-20 caracteres, letras, números o _)"
        );
      }
      return true;
    }),

  body("password")
    .trim()
    .notEmpty().withMessage("La contraseña es obligatoria")
    .isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres"),
];
