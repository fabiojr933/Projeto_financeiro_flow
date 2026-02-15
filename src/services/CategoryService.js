const CategoryRepository = require('../repositories/CategoryRepository');

class CategoryService {
  async save(data) {
    // Validações...
    if (!data.user_id) throw new Error('user_id é obrigatório');
    if (!data.name) throw new Error('nome é obrigatório');
    if (!data.type) throw new Error('tipo é obrigatório');
    const exists = await CategoryRepository.findByName(data.name, data.user_id);
    if (exists) throw new Error('já existe categoria com esse nome');
    return await CategoryRepository.create(data);
  }
  async listByUserId(user_id) {
    if (!user_id) throw new Error('user_id é obrigatório');
    return await CategoryRepository.listByUserId(user_id);
  }
  async listByUserIdReceita(user_id) {
    if (!user_id) throw new Error('user_id é obrigatório');
    return await CategoryRepository.listByUserIdReceita(user_id);
  }
  async listByUserIdDespesa(user_id) {
    if (!user_id) throw new Error('user_id é obrigatório');
    return await CategoryRepository.listByUserIdDespesa(user_id);
  }
  async update(id, data) {
    if (!id) throw new Error('id do membro é obrigatório');
    if (!data.name) throw new Error('nome é obrigatório');
    if (!data.color_code) throw new Error('cor é obrigatório');
    if (!data.type) throw new Error('tipo é obrigatório');

    return await CategoryRepository.update(id, data);
  }
  async delete(id, userId) {
    if (!id) throw new Error('id do membro é obrigatório');
    if (!userId) throw new Error('user_id é obrigatório');

    return await CategoryRepository.delete(id, userId);
  }

}

module.exports = new CategoryService();
