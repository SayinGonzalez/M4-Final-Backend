import mongoose from "mongoose";

const petSchema = new mongoose.Schema({
  petName: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    trim: true
  },
  sexo: {
    type: String,
    enum: ["female", "male"]
  },
  image: {
    type: String,
    required: [true, "La imagen es obligatoria"]
  },
  animalType: {
    type: String,
    enum: ["dog", "cat", "other"],
    required: [true, "La especie es obligatoria"]
  },
  breed: {
    type: String, default: null
  },
  age: {
    type: String,
    enum: ["cachorro", "adulto", "senior"],
    required: [true, "La edad es obligatoria"]
  },
  description: {
    type: String,
    trim: true,
    default: null
  },
  medicalStatus: {
    type: String,
    default: "Desconocido"
  },
  behaviorTraits: {
    type: String,
    default: null
  },
  preferences: {
    type: String,
    default: null
  },
  category: {
    type: String,
    enum: ["adoption", "match"],
    required: [true, "La categoría es obligatoria"]
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});


export default mongoose.model("Pet", petSchema);
