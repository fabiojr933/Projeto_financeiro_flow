const FamilyRepository = require('../repositories/FamilyRepository');

class FamilyService {
  async save(data) {
    // Validações...
    if (!data.user_id) throw new Error('user_id é obrigatório');
    if (!data.name) throw new Error('nome é obrigatório');
    if (!data.relationship) throw new Error('palentesco é obrigatório');
    return await FamilyRepository.create(data);
  }
  async listByUserId(user_id) {
    if (!user_id) throw new Error('user_id é obrigatório');
    return await FamilyRepository.listByUserId(user_id);
  }
  async update(id, data) {
    if (!id) throw new Error('id do membro é obrigatório');
    if (!data.name) throw new Error('nome é obrigatório');
    if (!data.color_code) throw new Error('cor é obrigatório');
    if (!data.relationship) throw new Error('parentesco é obrigatório');

    return await FamilyRepository.update(id, data);
  }
 async delete(id, userId) {
  if (!id) throw new Error('id do membro é obrigatório');
  if (!userId) throw new Error('user_id é obrigatório');

  return await FamilyRepository.delete(id, userId);
}



}

module.exports = new FamilyService();
