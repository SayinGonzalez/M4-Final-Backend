class IRepository {

    getPets() {
        throw new Error('Método "getPets()" no implementado');
    }
    
    getPetsByCategory() {
        throw new Error('Método "getPetsCategory()" no implementado');
    }
    
    getPetById() {
        throw new Error('Método "getPet()" no implementado');
    }

    createPet() {
        throw new Error('Método "addPet()" no implementado');
    }

    updatePet() {
        throw new Error('Método "editPet()" no implementado');
    }

    deletePet() {
        throw new Error('Método "deletePet()" no implementado');
    }

}

export default IRepository;