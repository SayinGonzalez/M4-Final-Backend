import PetRepository from '../repositories/PetRepository.mjs'

export async function listPetsService() {
  console.log('Ingreso listPetsService');

  const petsData = await PetRepository.getAll();
  /* console.log(petsData); */
  return petsData;
}

export async function findPetByIdService(id) {
  console.log('Ingreso findPetsByIdService');
  // console.log(`Service ID - ${id}`);

  const petData = await PetRepository.getById(id);
  console.log('Retorno a Service desde Repository');
  console.log(`Service Pet -`, petData);

  return petData;
}

export async function findPetsByCategoryService(category) {
  console.log('Ingreso findPetsByCategoryService');
  // console.log(`Service Category - ${category}`);

  const petData = await PetRepository.getPetsByCategory(category);
  return petData;
}

export async function getUserPetsService(userId, { page = 1, limit = 10 } = {}) {

  const skip = (page - 1) * limit;
  const { pets, total } = await PetRepository.getByOwner(userId, { limit, skip });
  console.log(`service byOwner - pets ${pets} - total ${total}`);

  return {
    pets,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
}

// export async function getPetsByQueryService(query = {}, pagination = {}) {

//   // 🔹 Paginación
//   const { page = 1, limit = 10 } = pagination;
//   const skip = (page - 1) * limit;
//   const options = { limit, skip, sort: { createdAt: -1 } };

//   // 🔹 Traemos mascotas filtradas y contadas
//   const { pets, total } = await petRepo.getByQuery(query, options);
//   console.log(`service byQuery - pets ${pets} - total ${total}`);

//   return {
//     pets,
//     pagination: {
//       total,
//       page,
//       limit,
//       totalPages: Math.ceil(total / limit),
//     },
//   };
// }

export async function getPetsByQueryService(filters, options) {
  return await PetRepository.getByQuery(filters, options);
}

export async function addPetService(petData, ownerId) {
  console.log('Ingreso addPetService');
  console.log('Service - Datos Recibidos:', petData);

  // Agregar el owner
  const newPet = {
    ...petData,
    owner: ownerId
  };

  return await PetRepository.create(newPet);
}

export async function editPetService(id, petData) {
  console.log('Ingreso editPetService');

  return await PetRepository.update(id, petData);
}

export async function deletePetService(id) {
  console.log('Ingreso deletePetService');

  return await PetRepository.delete(id);
}
