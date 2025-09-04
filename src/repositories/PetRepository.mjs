import Pet from "../models/Pet.mjs";
import IRepository from "./IRepository.mjs";

class PetRepository extends IRepository {

	async getAll() {
		console.log('Ingreso getPets');
		return await Pet.find();
	}

	async getById(id) {
		console.log('Ingreso getPetById');
		console.log(`Repository ID Pets - ${id}`);

		const pet = await Pet.findById(id);
		console.log(`Repository Data -`, pet);
		return pet;
	}

	async getByOwner(ownerId, { limit = 10, skip = 0, sort = { createdAt: -1 } } = {}) {
		const pets = await Pet.find({ "owner": ownerId })
			.limit(limit)
			.skip(skip)
			.sort(sort)
			.lean();
		console.log(`Repository owner:`, pets)
		const total = await Pet.countDocuments({ owner: ownerId });

		return { pets, total };
	}

	// Buscar por query y aplicar paginación/orden
	async getByQuery(query = {}, options = {}) {
		// 🔹 Lista blanca de campos permitidos
		const allowedFields = ['category', 'animalType', 'age', 'sexo'];
		const safeQuery = {};

		// 🔹 Filtrado: solo se usan los campos permitidos
		for (const key in query) {
			if (allowedFields.includes(key)) safeQuery[key] = query[key];
		}

		// 🔹 Paginación y ordenamiento
		const {page = 1, limit = 10, skip = 0, sort = { createdAt: -1 } } = options;

		// 🔹 Total de documentos que cumplen el filtro
		const total = await Pet.countDocuments(safeQuery);

		// 🔹 Consulta paginada
		const pets = await Pet.find(safeQuery)
			.limit(limit)
			.skip(skip)
			.sort(sort)
			.lean();

		return {
			pets,
			pagination: {
				total,
				page: Number(page),
				limit: Number(limit),
				totalPages: Math.ceil(total / limit),
			}
		};
	}

	async getPetsByCategory(category) {
		console.log('Ingreso getPetsByCategory');
		console.log(`Repository category - ${category}`);

		const pets = await Pet.find({
			"category": category
		});
		return pets;
	}

	async create(data) {
		console.log('Ingreso createPet');
		console.log('Repository - Datos Recibidos:', data);

		// 🔹 Crear nueva mascota con solo los datos válidos
		const newPet = new Pet(data);
		console.log('Repository - Mascota Instanciada', newPet);
		/* console.log('Repository -', JSON.stringify(newPet, null, 2)); */

		return await newPet.save();
	}

	async update(id, petData) {
		console.log('Ingreso updatePet');
		console.log('Repository - Datos Recibidos:', petData);

		// Evitamos que el front cambie el owner
		const { owner, ...updateData } = petData;

		const petModified = await Pet.findByIdAndUpdate(
			id,
			{ $set: updateData },  // Solo se actualizan los campos permitidos/modificados
			{ new: true }          // Devuelve el documento modificado
		);

		console.log('Repository - Mascota Modificada', petModified);
		return petModified;
	}

	async delete(id) {
		console.log('Ingreso deletePet');
		console.log(`Repository ID - ${id}`);

		const petDeleted = await Pet.findByIdAndDelete(id);
		console.log('Repository - Mascota Eliminada', petDeleted);

		return petDeleted;
	}
}

export default new PetRepository();