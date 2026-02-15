const TransactionRepository = require('../repositories/TransactionRepository');

class TransactionService {
  async save(data) {
    // Validações...
    // if (!data.name) throw new Error('Nome é obrigatório');

    // const exists = await UserRepository.findByEmail(data.email);
    // if (exists) throw new Error('Email já cadastrado');

    // data.password = await bcrypt.hash(data.password, 10);
    return await TransactionRepository.create(data);
  }

  async listAll(user_id, date1, date2) {
    if (!user_id) throw new Error('user_id é obrigatório');
    if (!date1) throw new Error('data inicial é obrigatório');
    if (!date2) throw new Error('data final é obrigatório');
    return TransactionRepository.listAll(user_id, date1, date2);
  }

    async delete(id, userId) {
      if (!id) throw new Error('id do membro é obrigatório');
      if (!userId) throw new Error('user_id é obrigatório');
  
      return await TransactionRepository.delete(id, userId);
    }
}

module.exports = new TransactionService();
