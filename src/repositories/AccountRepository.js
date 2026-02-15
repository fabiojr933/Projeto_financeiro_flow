const { Account } = require('../models');

class AccountRepository {

  async create(data) {
    return Account.create(data);
  }
  async listByUserId(userId) {
    return Account.findAll({
      where: {
        user_id: userId,
        active: 'S'
      },
      order: [['createdAt', 'ASC']]
    });
  }
  async update(id, data) {
    const account = await Account.findByPk(id);

    if (!account) {
      throw new Error('Conta não encontrado');
    }

    return await account.update(data);
  }
  async delete(id, userId) {
    return Account.destroy({
      where: {
        id,
        user_id: userId
      }
    });
  }
 async findByName({ institution_name, type, user_id }) {
  return Account.findOne({
    where: {
      institution_name,
      type,
      user_id
    }
  });
}

}

module.exports = new AccountRepository();
