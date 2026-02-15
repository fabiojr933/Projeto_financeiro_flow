const { Category } = require('../models');

class CategoryRepository {

  async create(data) {
    return Category.create(data);
  }
  async listByUserId(userId) {
    return Category.findAll({
      where: {
        user_id: userId,
        active: 'S'
      },
      order: [['createdAt', 'ASC']]
    });
  }
  async listByUserIdReceita(userId) {
    return Category.findAll({
      where: {
        user_id: userId,
        'type': 'receita',
        active: 'S'
      },
      order: [['createdAt', 'ASC']]
    });
  }
  async listByUserIdDespesa(userId) {
    return Category.findAll({
      where: {
        user_id: userId,
        'type': 'despesa',
        active: 'S'
      },
      order: [['createdAt', 'ASC']]
    });
  }
  async update(id, data) {
    const category = await Category.findByPk(id);

    if (!category) {
      throw new Error('Categoria não encontrado');
    }

    return await category.update(data);
  }
  async delete(id, userId) {
    return Category.destroy({
      where: {
        id,
        user_id: userId
      }
    });
  }
  async bulkCreate(data) {
    return Category.bulkCreate(data);
  }
  async findByNameAndUser(name, userId) {
    return Category.findOne({
      where: {
        name,
        user_id: userId
      }
    });
  }
  async findByName(name, user_id) {
    return Category.findOne({
      where: {
        name,
        user_id
      }
    });
  }
}

module.exports = new CategoryRepository();
