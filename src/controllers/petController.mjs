import {
  listPetsService,
  findPetsByCategoryService,
  findPetByIdService,
  addPetService,
  editPetService,
  deletePetService,
  getUserPetsService,
  getPetsByQueryService
} from '../services/petService.mjs'
import { AppError } from '../utils/AppError.mjs';


export async function listPetsController(req, res, next) {

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

export async function findPetByIdController(req, res, next) {

  try {
    console.log('Ingreso findPetByIdController');

    const petId = req.params.id;
    // console.log(`Controller ID - ${id}`);
    const petFound = await findPetByIdService(petId);

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

export async function findPetsByCategoryController(req, res, next) {

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

export async function getUserPetsController(req, res, next) {
  try {
    console.log('getUserPetsController req.user', req.user)
    const userId = req.user.id; // viene del middleware de auth
    const { page = 1, limit = 10 } = req.query;
    console.log('userId getUserPetsController:', userId)

    const result = await getUserPetsService(userId, {
      page: parseInt(page),
      limit: parseInt(limit)
    });

    res.status(200).json({
      success: true,
      data: result.pets,
      pagination: result.pagination,
    });
  } catch (err) {
    next(err);
  }
}

export async function getPetsByQueryController(req, res, next) {
  try {
    console.log("Ingreso getPetsByQueryController");

    // 🔹 Filtros desde query string
    const filters = req.query;

    // 🔹 Parámetros de paginación
    const options = {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,
      sort: req.query.sort ? JSON.parse(req.query.sort) : {}
    };

    const { pets, pagination } = await getPetsByQueryService(filters, options);

    res.json({
      success: true,
      data: pets,
      pagination,
    });
  } catch (err) {
    next(err);
  }
}

export async function addPetController(req, res, next) {
  try {
    console.log('Ingreso addPetController');

    const petData = req.body;
    const ownerId = req.user._id; // viene del middleware de autenticación

    console.log('Controller - Datos Recibidos:', petData, 'OwnerId:', ownerId);

    const petCreated = await addPetService(petData, ownerId);

    console.log('Controller - petCreated:', petCreated);

    res.status(201).json({
      success: true,
      message: "Mascota creada con éxito",
      data: petCreated
    });

  } catch (err) {
    next(err);
  }
}

export async function editPetController(req, res, next) {

  try {
    console.log('Ingreso editPetController');

    const petId = req.params.id;
    const petData = req.body;
    const petModified = await editPetService(petId, petData);

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

    const petId = req.params.id;
    const petDeleted = await deletePetService(petId);
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
