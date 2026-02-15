const { Transaction, User, Category, FamilyMember, Account } = require('../models');
const { Op } = require('sequelize');

class TransactionRepository {

  async findByEmail(email) {
    return Transaction.findOne({
      where: { email }
    });
  }

  async create(data) {
    return Transaction.create(data);
  }

  async listAll(user_id, date1, date2) {
    const accounts = await Transaction.findAll({
      where: {
        user_id: user_id,
        due_date: {
          [Op.between]: [date1, date2]
        }
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name']
        },
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name']
        },
        {
          model: FamilyMember,
          as: 'family_member',
          attributes: ['id', 'name'],
          required: false
        },
        {
          model: Account,
          as: 'account',
          attributes: ['id', 'institution_name']
        }
      ]
    });
    return accounts;
  }

    async delete(id, userId) {
    return Transaction.destroy({
      where: {
        id,
        user_id: userId
      }
    });
  }
}

module.exports = new TransactionRepository();
