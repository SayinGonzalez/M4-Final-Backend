import mongoose from "mongoose";

const breedSchema = new mongoose.Schema({
  animalType: { type: String, required: true },
  breed: { type: String, required: true, unique: true }
});

const Breed = mongoose.model("Breed", breedSchema);
export default Breed;
