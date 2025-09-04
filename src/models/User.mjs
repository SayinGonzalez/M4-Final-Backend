import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({

  username: {
    type: String,
    required: [true, "El nombre de usuario es obligatorio"],
    trim: true,
    unique: true,
    minlength: [3, "El usuario debe tener al menos 3 caracteres"],
    maxlength: [20, "El usuario no puede superar 20 caracteres"]
  },

  email: {
    type: String,
    required: [true, "El email es obligatorio"],
    trim: true,
    unique: true,
    lowercase: true  // conviene guardar siempre en minúscula
  },

  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
    minlength: [6, "La contraseña debe tener al menos 6 caracteres"]
  },

  firstName: {
    type: String,
    required: true,
    trim: true
  },

  lastName: {
    type: String,
    required: true,
    trim: true
  },

  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
    required: true
  },
  // role: {
  //   type: String,
  //   enum: ['user', 'admin'],
  //   default: 'user'
  // },

  isActive: {
    type: Boolean,
    default: true
  },

  profileImage: {
    type: String,
    default: ""  // opcional, mejor que null
  },

  preferences: {
    language: {
      type: String,
      enum: ["es", "en", "fr"],  // restringe valores
      default: 'es'
    },
    notifications: {
      type: Boolean,
      default: null // ⬅ significa "todavía no eligió"
    },
  },
  
  address: {
    zipCode: {
      type: String,
      match: [/^\d{4,6}$/, "El código postal no es válido"]  // Ejemplo de regex
    },
    localidad: {
      type: String,
      trim: true
    }
  }

}, { timestamps: true });  // agrega createdAt y updatedAt automáticamente

export default mongoose.model('User', userSchema);