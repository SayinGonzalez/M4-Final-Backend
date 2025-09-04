import User from "../models/User.mjs";
import IRepository from "./IRepository.mjs";

class UserRepository extends IRepository {

  async getAll() {
    console.log('Ingreso getAll');
    return await User.find().lean();
  }

  async getById(id) {
    console.log('Ingreso getById')
    console.log(`Repository ID User - ${id}`);

    const user = await User.findById(id).populate("role");
    // console.log(`Repository Data User -`, user);
    return user;
  }

  async getByEmail(email) {
    console.log('Ingreso getByEmail')
    console.log(`Repository email - ${email}`);

    return await User.findOne({ email });
  }

  async getByUsername(username) {
    console.log('Ingreso getByUsername')
    console.log(`Repository email - ${username}`);

    return await User.findOne({ username });
  }

  // // async findByQuery(query = {}, options = {}) {
  // async getByQuery(query = {}) {
  //   console.log('Ingreso getByQuery')
  //   const allowedFields = ["username", "email", "role", "isActive"];
  //   const safeQuery = {};

  //   for (const key in query) {
  //     if (allowedFields.includes(key)) {
  //       safeQuery[key] = query[key];
  //     }
  //   }

  //   // // 🔹 Opciones extra (ejemplo: paginación o proyección)
  //   // const { limit = 20, skip = 0, sort = {} } = options;

  //   // return await User.find(safeQuery)
  //   //   .limit(limit)
  //   //   .skip(skip)
  //   //   .sort(sort)
  //   //   .lean();

  //   return await User.find(safeQuery);
  // }

  // async getByRole(id, role){
  // //   console.log('Ingreso getByRole')

  // }

  async create(userData) {
    console.log('Ingreso create')
    console.log('Repository - Datos Recibidos:', userData);
    const newUser = new User(userData);
    return await newUser.save();
  }

  async update(id, data) {
    console.log('Ingreso update')

    const userModified = await User.findByIdAndUpdate(id,
      { $set: data },
      { new: true }
    );

    return userModified
  }

  async delete(id) {
    console.log('Ingreso delete')
    console.log(`Repository ID - ${id}`);

    return await User.findByIdAndDelete(id);
  }
}

export default new UserRepository();
