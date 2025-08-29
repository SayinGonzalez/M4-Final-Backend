import { body } from "express-validator";

console.log('Ingreso petValidations');
export const petValidations = [

  // 🔹 petName
  body("petName")
    .trim()
    .notEmpty().withMessage("El nombre es obligatorio"),

  // 🔹 sexo (condicional: obligatorio solo si category === "match")
  body("sexo")
    .optional()
    .isIn(["female", "male"]).withMessage("Debe ser female o male")
    .custom((value, { req }) => {
      if (req.body.category === "match" && !value) {
        throw new Error("El sexo de la mascota es obligatorio cuando la categoría es 'match'");
      }
      return true;
    }),

  // 🔹 image
  body("image")
    .notEmpty().withMessage("La imagen es obligatoria")
    .isURL().withMessage("Debe ser una URL válida"),

  // 🔹 animalType
  body("animalType")
    .notEmpty().withMessage("La especie es obligatoria")
    .isIn(["dog", "cat", "other"]).withMessage("Debe ser dog, cat u other"),

  // 🔹 breed (opcional)
  body("breed")
    .optional({ checkFalsy: true }),

  // 🔹 age
  body("age")
    .notEmpty().withMessage("La edad es obligatoria")
    .isIn(["cachorro", "adulto", "senior"]).withMessage("Debe ser cachorro, adulto o senior"),

  // 🔹 description (opcional)
  body("description")
    .optional({ checkFalsy: true })
    .trim(),

  // 🔹 medicalStatus (condicional con category === match)
  body("medicalStatus")
    .optional()
    .custom((value, { req }) => {
      if (req.body.category === "match" && (!value || value.trim() === "")) {
        throw new Error("El estado médico es obligatorio cuando la categoría es 'match'");
      }
      return true;
    }),

  // 🔹 behaviorTraits (opcional)
  body("behaviorTraits")
    .optional({ checkFalsy: true }),

  // 🔹 preferences (opcional)
  body("preferences")
    .optional({ checkFalsy: true }),

  // 🔹 category
  body("category")
    .notEmpty().withMessage("La categoría es obligatoria")
    .isIn(["adoption", "match"]).withMessage("Debe ser adoption o match"),
];


/* 
import { checkSchema, body } from "express-validator";

export const petValidation = [
  // ✅ Reglas declarativas con checkSchema
  checkSchema({
    petName: {
      in: ["body"],
      notEmpty: { errorMessage: "El nombre es obligatorio" },
      trim: true,
    },
    image: {
      in: ["body"],
      notEmpty: { errorMessage: "La imagen es obligatoria" },
      isURL: { errorMessage: "Debe ser una URL válida" },
    },
    animalType: {
      in: ["body"],
      notEmpty: { errorMessage: "La especie es obligatoria" },
      isIn: {
        options: [["dog", "cat", "other"]],
        errorMessage: "Debe ser dog, cat u other",
      },
    },
    breed: {
      in: ["body"],
      optional: true,
    },
    age: {
      in: ["body"],
      notEmpty: { errorMessage: "La edad es obligatoria" },
      isIn: {
        options: [["cachorro", "adulto", "senior"]],
        errorMessage: "Debe ser cachorro, adulto o senior",
      },
    },
    description: {
      in: ["body"],
      optional: true,
      trim: true,
    },
    medicalStatus: {
      in: ["body"],
      optional: true,
      default: { options: "Desconocido" },
    },
    behaviorTraits: {
      in: ["body"],
      optional: true,
    },
    preferences: {
      in: ["body"],
      optional: true,
    },
    category: {
      in: ["body"],
      notEmpty: { errorMessage: "La categoría es obligatoria" },
      isIn: {
        options: [["adoption", "match"]],
        errorMessage: "Debe ser adoption o match",
      },
    },
  }),

  // ✅ Reglas condicionales con body()
  body("sexo").custom((value, { req }) => {
    if (req.body.category === "match" && !value) {
      throw new Error("El sexo es obligatorio si la categoría es 'match'");
    }
    if (value && !["female", "male"].includes(value)) {
      throw new Error("El sexo debe ser female o male");
    }
    return true;
  }),

  body("medicalStatus").custom((value, { req }) => {
    if (req.body.category === "match" && !value) {
      throw new Error("El estado médico es obligatorio si la categoría es 'match'");
    }
    return true;
  }),
];

*/


/* 
export const petUpdateSchemaValidation = checkSchema({
  petName: {
    optional: true,
    trim: true,
    notEmpty: { errorMessage: "El nombre no puede estar vacío" },
  },
  sexo: {
    optional: true,
    isIn: {
      options: [["female", "male"]],
      errorMessage: "Debe ser female o male",
    },
    custom: {
      options: (value, { req }) => {
        if (req.body.category === "match" && !value) {
          throw new Error("El sexo es obligatorio cuando la categoría es 'match'");
        }
        return true;
      },
    },
  },
  image: {
    optional: true,
    isURL: { errorMessage: "Debe ser una URL válida" },
    customSanitizer: {
      options: (value) => new URL(value).toString(),
    },
  },
  animalType: {
    optional: true,
    isIn: {
      options: [["dog", "cat", "other"]],
      errorMessage: "Debe ser dog, cat u other",
    },
  },
  breed: { optional: true },
  age: {
    optional: true,
    isIn: {
      options: [["cachorro", "adulto", "senior"]],
      errorMessage: "Debe ser cachorro, adulto o senior",
    },
  },
  description: { optional: true, trim: true },
  medicalStatus: {
    optional: true,
    custom: {
      options: (value, { req }) => {
        if (req.body.category === "match" && (!value || value.trim() === "")) {
          throw new Error("El estado médico es obligatorio cuando la categoría es 'match'");
        }
        return true;
      },
    },
  },
  behaviorTraits: { optional: true },
  preferences: { optional: true },
  category: {
    optional: true,
    isIn: {
      options: [["adoption", "match"]],
      errorMessage: "Debe ser adoption o match",
    },
  },
});

*/