import {
  listPetsService,
  findPetsByCategoryService,
  findPetByIdService,
  addPetService,
  editPetService,
  deletePetService
} from '../services/petService.mjs'
import { AppError } from '../utils/AppError.mjs';


export async function listPetsController(req, res) {

  try {
    console.log('Ingreso listPetsController');

    const pets = await listPetsService();
    console.log('pets -> ', pets);

    return res.status(200).json({
      success: true,
      message: "Mascotas obtenidas con éxito",
      data: pets
    });

  } catch (err) {
    next(err); // pasa el error al middleware global
  }
}

export async function findPetsByCategoryController(req, res) {

  try {
    console.log('Ingreso findPetsByCategoryController');

    const { category } = req.params;
    const pets = await findPetsByCategoryService(category);

    if (!pets || pets.length === 0) {
      throw new AppError("No se encontraron mascotas para esta categoría", 404);
    }

    return res.status(200).json({
      success: true,
      message: "Mascotas encontradas",
      data: pets
    });

  } catch (err) {
    next(err); // pasa el error al middleware global
  }

}

export async function findPetByIdController(req, res) {

  try {
    console.log('Ingreso findPetByIdController');

    const { id } = req.params;
    // console.log(`Controller ID - ${id}`);
    const petFound = await findPetByIdService(id);

    if (!petFound) {
      throw new AppError("Mascota no encontrada", 404);
    }

    // console.log('==============================================');
    // console.log('Retorno a Controller desde Service');
    // console.log(`Countroller Pet -`, petFound);

    return res.status(200).json({
      success: true,
      message: "Mascota encontrada",
      data: petFound
    });

  } catch (err) {
    next(err); // pasa el error al middleware global
  }
}

export async function addPetController(req, res) {

  try {
    console.log('Ingreso addPetController');

    const petData = req.body;
    console.log('Controller - Datos Recibidos:', petData);
    const petCreated = await addPetService(petData);
    console.log('Controller - petCreated:', petCreated);

    res.status(201).json({
      success: true,
      message: "Mascota creada con éxito",
      data: petCreated
    });

  } catch (err) {
    next(err); // pasa el error al middleware global
  }

}

export async function editPetController(req, res) {

  try {
    console.log('Ingreso editPetController');

    const { id } = req.params;
    const petData = req.body;
    const petModified = await editPetService(id, petData);

    if (!petModified) {
      throw new AppError("No se pudo editar la mascota (no encontrada)", 404);
    }

    return res.status(200).json({
      success: true,
      message: "Mascota editada con éxito",
      data: petModified
    });

  } catch (err) {
    next(err); // pasa el error al middleware global
  }
}

export async function deletePetController(req, res, next) {

  try {
    console.log('Ingreso deletePetController');

    const { id } = req.params;
    const petDeleted = await deletePetService(id);
    console.log('Controller - Pet Deleted:', petDeleted);

    if (!petDeleted) {
      throw new AppError("No se pudo eliminar la mascota (no encontrada)", 404);
    }

    return res.status(200).json({
      success: true,
      message: "Mascota eliminada con éxito",
      data: petDeleted
    });

  } catch (err) {
    next(err); // pasa el error al middleware global
  }
}



/*
  En errorHandler.mjs
  export function errorHandler(err, req, res, next) {
    console.error("🔥 Error capturado:", err);

    // Si ya se envió respuesta, salimos
    if (res.headersSent) {
      return next(err);
    }

    // Determinar el código de estado
    const status = err.statusCode || 500;

    res.status(status).json({
      success: false,
      message: err.message || "Error interno del servidor",
      error: process.env.NODE_ENV === "development" ? err.stack : undefined
    });
  }


  En App.mjs
  // Middleware global de errores (al final siempre)
  app.use(errorHandler);


  Ejemplo de uso en controller
  } catch (err) {
    next(err); // delega al errorHandler
  }
*/