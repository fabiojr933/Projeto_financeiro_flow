const { Transaction, User, Category, FamilyMember, Account } = require('../models');
const { Op } = require('sequelize');

class ReportRepository {
  async sumListCategoryReceita(user_id, date1, date2) {
    const { fn, col } = require('sequelize');

    const result = await Transaction.findAll({
      where: {
        user_id: user_id,
        type: 'receita',
        due_date: {
          [Op.between]: [date1, date2]
        }
      },
      attributes: [
        [col('category.name'), 'name'],
        [fn('SUM', col('transaction.amount')), 'amount']
      ],
      include: [
        {
          model: Category,
          as: 'category',
          attributes: []
        }
      ],
      group: ['category.name'],
      raw: true
    });
    return result;
  }

  async sumListCategoryDespesa(user_id, date1, date2) {
    const { fn, col } = require('sequelize');

    const result = await Transaction.findAll({
      where: {
        user_id: user_id,
        type: 'despesa',
        due_date: {
          [Op.between]: [date1, date2]
        }
      },
      attributes: [
        [col('category.name'), 'name'],
        [fn('SUM', col('transaction.amount')), 'amount']
      ],
      include: [
        {
          model: Category,
          as: 'category',
          attributes: []
        }
      ],
      group: ['category.name'],
      raw: true
    });
    return result;
  }

  async sumListCategory(user_id, date1, date2) {
    const { fn, col } = require('sequelize');

    const result = await Transaction.findAll({
      where: {
        user_id: user_id,
        due_date: {
          [Op.between]: [date1, date2]
        }
      },
      attributes: [
        [col('category.name'), 'name'],
        [fn('SUM', col('transaction.amount')), 'amount']
      ],
      include: [
        {
          model: Category,
          as: 'category',
          attributes: []
        }
      ],
      group: ['category.name'],
      raw: true
    });
    return result;
  }

async sumListAccount(user_id, date1, date2) {
    const { fn, col } = require('sequelize');

    const result = await Transaction.findAll({
      where: {
        user_id: user_id,
        due_date: {
          [Op.between]: [date1, date2]
        }
      },
      attributes: [
        [
          fn(
            'CONCAT',
            col('account.institution_name'),
            ' - ',
            col('account.type')
          ),
          'name'
        ],
        [fn('SUM', col('transaction.amount')), 'amount']
      ],
      include: [
        {
          model: Account,
          as: 'account',
          attributes: []
        }
      ],
      group: ['account.institution_name','account.type'],
      raw: true
    });
    return result;
  }

  async sumListFamilyMember(user_id, date1, date2) {
    const { fn, col } = require('sequelize');

    const result = await Transaction.findAll({
      where: {
        user_id: user_id,
        due_date: {
          [Op.between]: [date1, date2]
        }
      },
      attributes: [
        [
          fn(
            'CONCAT',
            col('family_member.name'),
            ' - ',
            col('family_member.relationship')
          ),
          'name'
        ],
        [fn('SUM', col('transaction.amount')), 'amount']
      ],
      include: [
        {
          model: FamilyMember,
          as: 'family_member',
          attributes: []
        }
      ],
      group: ['family_member.name','family_member.relationship'],
      raw: true
    });
    return result;
  }

    async sumListTransactionDate(user_id, date1, date2) {
    const { fn, col } = require('sequelize');

    const result = await Transaction.findAll({
      where: {
        user_id: user_id,      
        due_date: {
          [Op.between]: [date1, date2]
        }
      },
      attributes: [
        [col('transaction.due_date'), 'due_date'],
        [fn('SUM', col('transaction.amount')), 'amount']
      ],
      group: ['transaction.due_date'],
      order: [[col('transaction.due_date'), 'ASC']], // 👈 ORDER BY
      raw: true
    });
    return result;
  }

  async listAll(user_id, limit = 5) {
  const accounts = await Transaction.findAll({
    where: {
      user_id: user_id
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
    ],

    order: [['id', 'DESC']], // 🔥 mais recentes primeiro
    limit: Number(limit)              // 🔥 últimos 10
  });

  return accounts;
}


}

module.exports = new ReportRepository();
