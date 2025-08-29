import Pet from "../models/Pet.mjs";
import IRepository from "./IRepository.mjs";

class PetRepository extends IRepository {

    async getPets() {
        console.log('Ingreso getPets');
        return await Pet.find();
    }

    async getPetsByCategory(category) {
        console.log('Ingreso getPetsByCategory');
        console.log(`Repository category - ${category}`);

        const pets = await Pet.find({
            "category": category
        });
        return pets;
    }

    async getPetById(id) {
        console.log('Ingreso getPetById');
        console.log(`Repository ID - ${id}`);

        const pet = await Pet.findById(id);
        console.log(`Repository Data -`, pet);
        return pet;
    }

    async createPet(petData) {
        console.log('Ingreso createPet');
        console.log('Repository - Datos Recibidos:', petData);

        // 🔹 Crear nueva mascota con solo los datos válidos
        const newPet = new Pet(petData);
        // const newPet = new Pet({
        //     ...petData,
        //     // "ownerId": 
        // });
        console.log('Repository - Mascota Instanciada', newPet);
        /* console.log('Repository -', JSON.stringify(newPet, null, 2)); */

        return await newPet.save();
    }

    async updatePet(id, petData) {
        console.log('Ingreso updatePet');
        console.log('Repository - Datos Recibidos:', petData);

        const petModified = await Pet.findByIdAndUpdate(id,
            { $set: petData },  //  Para que se actualice solo lo que cambió
            { new: true });  //  Para que devuelva el documento ya modificado
        console.log('Repository - Mascota Modificada', petModified);

        return petModified;
    }

    async deletePet(id) {
        console.log('Ingreso deletePet');
        console.log(`Repository ID - ${id}`);

        const petDeleted = await Pet.findByIdAndDelete(id);
        console.log('Repository - Mascota Eliminada', petDeleted);

        return petDeleted;
    }
}

export default new PetRepository();