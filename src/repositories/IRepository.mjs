class IRepository {

    async getAll() {
        throw new Error('Método "findAll()" no implementado');
    }

    async getById(id) {
        throw new Error('Método "findById()" no implementado');
    }

    async create(data) {
        throw new Error('Método "create()" no implementado');
    }

    async update(id, data) {
        throw new Error('Método "update()" no implementado');
    }

    async delete(id) {
        throw new Error('Método "delete()" no implementado');
    }
}

export default IRepository;