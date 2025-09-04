import mongoose from "mongoose";
import axios from "axios";
import Breed from "../models/Breed.mjs";
import { connectDB } from "../config/dbConfig.mjs";
import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";

const env = dotenv.config();
dotenvExpand.expand(env);

// 🔹 Consultar y transformar razas
async function fetchAndTransformBreeds() {
  const { data } = await axios.get("https://dog.ceo/api/breeds/list/all");

  if (data.status !== "success") {
    throw new Error("Error al consultar la API de razas");
  }

  const breedsData = data.message;

  // raza principal sola + raza con subrazas
  const breeds = Object.entries(breedsData).flatMap(([breed, subBreeds]) => {
    if (subBreeds.length === 0) {
      return [breed];
    }
    return [breed, ...subBreeds.map(sub => `${breed} ${sub}`)];
  });

  console.log(breeds)
  return breeds;
}

// 🔹 Guardar razas en MongoDB
async function saveBreedsToDB() {
  try {
    await connectDB();
    console.log("✅ Conectado a MongoDB");

    const breeds = await fetchAndTransformBreeds();

    // Adaptar al esquema
    const docs = breeds.map(breedName => ({
      animalType: "dog",   // 👈 siempre "dog"
      breed: breedName
    }));

    // 🔥 Limpiar colección antes de insertar
    await Breed.deleteMany({});
    console.log("🗑️ Colección de breeds limpiada");

    // Insertar nuevas razas
    await Breed.insertMany(docs);
    console.log("✅ Razas guardadas en la base de datos");

  } catch (err) {
    console.error("❌ Error en saveBreedsToDB:", err.message);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Desconectado de MongoDB");
  }
}

// 🚀 Ejecutar
saveBreedsToDB();
// fetchAndTransformBreeds();
