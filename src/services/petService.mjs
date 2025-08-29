import PetRepository from '../repositories/PetRepository.mjs'

export async function listPetsService() {
  console.log('Ingreso listPetsService');

  const petsData = await PetRepository.getPets();
  /* console.log(petsData); */
  return petsData;
}

export async function findPetsByCategoryService(category) {
  console.log('Ingreso findPetsByCategoryService');
  // console.log(`Service Category - ${category}`);

  const petData = await PetRepository.getPetsByCategory(category);
  return petData;
}

export async function findPetByIdService(id) {
  console.log('Ingreso findPetsByCategoryService');
  // console.log(`Service ID - ${id}`);

  const petData = await PetRepository.getPetById(id);
  console.log('Retorno a Service desde Repository');
  console.log(`Service Pet -`, petData);

  return petData;
}

export async function addPetService(petData) {
  console.log('Ingreso addPetService');
  console.log('Service - Datos Recibidos:', petData);

  return await PetRepository.createPet(petData);
}

export async function editPetService(id, petData) {
  console.log('Ingreso editPetService');

  return await PetRepository.updatePet(id, petData);
}

export async function deletePetService(id) {
  console.log('Ingreso deletePetService');

  return await PetRepository.deletePet(id);
}






