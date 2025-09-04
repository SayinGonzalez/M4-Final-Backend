import UserRepository from "../repositories/UserRepository.mjs";

export async function listUsersService() {
  console.log('Ingreso listUserService');

  const usersData = await UserRepository.getAll();
  /* console.log(usersData); */
  return usersData;
}

export async function findUserByIdService(id) {
  console.log('Ingreso findUserByIdService');
  // console.log(`Service ID - ${id}`);

  const userData = await UserRepository.getById(id);
  console.log('Retorno a Service desde Repository');
  console.log(`Service User -`, userData);

  return userData;
}

// export async function findUserByRoleService(id, role) {
//   console.log('Ingreso findUserByRolService');
//   // console.log(`Service ID - ${id}`);

//   const userData = await UserRepository.getById(id, role);
//   console.log('Retorno a Service desde Repository');
//   console.log(`Service User -`, userData);

//   return userData;
// }

/* export async function addUserService(userData) {
  console.log('Ingreso addUserService');
  console.log('Service - Datos Recibidos:', userData);

  return await UserRepository.create(userData);
} */

export async function editUserService(id, userData) {
  console.log('Ingreso editUserService');

  return await UserRepository.update(id, userData);
}

export async function deleteUserService(id) {
  console.log('Ingreso deleteUserService');

  return await UserRepository.delete(id);
}
