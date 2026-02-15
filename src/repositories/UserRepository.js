const { User } = require('../models');

class UserRepository {

  async findByEmail(email) {
    return User.findOne({
      where: { email }
    });
  }

  async create(data) {
    return User.create(data);
  }

  async update(id, data) {
    const user = await User.findByPk(id);

    if (!user) {
      throw new Error('Usuario não encontrado');
    }

    return await user.update(data);
  }

  async listByUserId(userId) {
    return User.findByPk(userId);
  }
}

module.exports = new UserRepository();
