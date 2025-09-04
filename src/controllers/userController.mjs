
import {
  deleteUserService,
  editUserService,
  findUserByIdService,
  listUsersService
} from '../services/userService.mjs';
import { AppError } from '../utils/AppError.mjs';


export async function listUsersController(req, res, next) {

  try {
    console.log('Ingreso listPetsController');

    const user = await listUsersService();
    console.log('user ➜ ', user);

    return res.status(200).json({
      success: true,
      message: "Usuarios obtenidos con éxito",
      data: user
    });

  } catch (err) {
    next(err); // pasa el error al middleware global
  }
}

// export async function findUsersByCategoryController(req, res) {

//   try {
//     console.log('Ingreso findPetsByCategoryController');

//     const { category } = req.params;
//     const pets = await findPetsByCategoryService(category);

//     if (!pets || pets.length === 0) {
//       throw new AppError("No se encontraron mascotas para esta categoría", 404);
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Mascotas encontradas",
//       data: pets
//     });

//   } catch (err) {
//     next(err); // pasa el error al middleware global
//   }

// }

export async function findUserByIdController(req, res, next) {

  try {
    console.log('Ingreso findUserByIdController');

    const { id } = req.params;
    // console.log(`Controller ID - ${id}`);
    const userFound = await findUserByIdService(id);

    if (!userFound) {
      throw new AppError("Usuario no encontrado", 404);
    }

    // console.log('==============================================');
    // console.log('Retorno a Controller desde Service');
    // console.log(`Countroller User -`, userFound);

    return res.status(200).json({
      success: true,
      message: "Usuario encontrado",
      data: userFound
    });

  } catch (err) {
    next(err); // pasa el error al middleware global
  }
}

export async function editUserController(req, res, next) {

  try {
    console.log('Ingreso editUserController');

    const { id } = req.params;
    const userData = req.body;
    const userModified = await editUserService(id, userData);

    if (!userModified) {
      throw new AppError("No se pudo editar el usuario (no encontrado)", 404);
    }

    return res.status(200).json({
      success: true,
      message: "Usuario editado con éxito",
      data: userModified
    });

  } catch (err) {
    next(err); // pasa el error al middleware global
  }
}

export async function deleteUserController(req, res, next) {

  try {
    console.log('Ingreso deleteUserController');

    const { id } = req.params;
    const userDeleted = await deleteUserService(id);
    console.log('Controller - User Deleted ➜', userDeleted);

    if (!userDeleted) {
      throw new AppError("No se pudo eliminar el usuario (no encontrado)", 404);
    }

    return res.status(200).json({
      success: true,
      message: "Usuario eliminado con éxito",
      data: userDeleted
    });

  } catch (err) {
    next(err); // pasa el error al middleware global
  }
}
