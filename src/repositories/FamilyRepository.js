const { FamilyMember } = require('../models');

class FamilyRepository {

  async create(data) {
    return FamilyMember.create(data);
  }
  async listByUserId(userId) {
    return FamilyMember.findAll({
      where: {
        user_id: userId,
        active: 'S'
      },
      order: [['createdAt', 'ASC']]
    });
  }
  async update(id, data) {
    const family = await FamilyMember.findByPk(id);

    if (!family) {
      throw new Error('Membro não encontrado');
    }

    return await family.update(data);
  }
  async delete(id, userId) {
    return FamilyMember.destroy({
      where: {
        id,
        user_id: userId
      }
    });
  }


}

module.exports = new FamilyRepository();
