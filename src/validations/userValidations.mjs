// userValidation.mjs
import { body } from "express-validator";

export const userValidations = [

  body("firstName")
    .notEmpty().withMessage("El nombre es obligatorio")
    .isAlpha("es-ES", { ignore: " " }).withMessage("El nombre solo puede contener letras"),

  body("lastName")
    .notEmpty().withMessage("El apellido es obligatorio")
    .isAlpha("es-ES", { ignore: " " }).withMessage("El apellido solo puede contener letras"),

  body("role")
    .notEmpty().withMessage("El rol es obligatorio")
    .isMongoId().withMessage("El rol debe ser un ObjectId válido"),

  body("isActive")
    .optional()
    .isBoolean().withMessage("El estado debe ser true o false"),

  body("profileImage")
    .optional()
    .isURL().withMessage("La imagen de perfil debe ser una URL válida"),

  body("preferences.language")
    .optional()
    .isIn(["es", "en", "fr"]).withMessage("Idioma no permitido"),

  body("preferences.notifications")
    .optional({ nullable: true })
    .isBoolean().withMessage("Las notificaciones deben ser true o false"),

  body("address.zipCode")
    .optional()
    .matches(/^\d{4,6}$/).withMessage("El código postal debe tener entre 4 y 6 dígitos"),

  body("address.localidad")
    // .trim()
    // .notEmpty().withMessage("El address es obligatorio")
    .optional()
    .isString().withMessage("La localidad debe ser un texto")

];
