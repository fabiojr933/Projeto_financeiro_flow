const AccountRepository = require('../repositories/AccountRepository');

class AccountService {
  async save(data) {
    // Validações...
    if (!data.user_id) throw new Error('user_id é obrigatório');
    if (!data.institution_name) throw new Error('nome é obrigatório');
    if (!data.type) throw new Error('tipo é obrigatório');
    const exists = await AccountRepository.findByName({institution_name: data.institution_name, type: data.type, user_id: data.user_id });
    if (exists) throw new Error('já existe com esse nome');
    return await AccountRepository.create(data);
  }
  async listByUserId(user_id) {
    if (!user_id) throw new Error('user_id é obrigatório');
    return await AccountRepository.listByUserId(user_id);
  }
  async update(id, data) {
    if (!id) throw new Error('id conta é obrigatório');
    if (!data.institution_name) throw new Error('nome é obrigatório');
    if (!data.type) throw new Error('tipo é obrigatório');

    return await AccountRepository.update(id, data);
  }
  async delete(id, userId) {
    if (!id) throw new Error('id do membro é obrigatório');
    if (!userId) throw new Error('user_id é obrigatório');

    return await AccountRepository.delete(id, userId);
  }

}

module.exports = new AccountService();
