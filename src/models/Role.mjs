import mongoose from "mongoose";

const validResources = ["users", "admins", "profile", "pets"];

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  permissions: {
    create: [{ type: String, enum: validResources }],
    read:   [{ type: String, enum: validResources }],
    update: [{ type: String, enum: validResources }],
    delete: [{ type: String, enum: validResources }]
  }
}, { timestamps: true });

const Role = mongoose.model("Role", roleSchema);
export default Role;
