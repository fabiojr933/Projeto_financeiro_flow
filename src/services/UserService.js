const UserRepository = require('../repositories/UserRepository');
const { randomUUID } = require('crypto');
const bcrypt = require('bcrypt');

class UserService {
  async save(data) {
    // Validações...
    if (!data.name) throw new Error('Nome é obrigatório');

    const exists = await UserRepository.findByEmail(data.email);
    if (exists) throw new Error('Email já cadastrado');

    data.password = await bcrypt.hash(data.password, 10);
    return await UserRepository.create(data);
  }

  async authenticate({ email, password }) {
    if (!email || !password) {
      throw new Error('Email e senha são obrigatórios');
    }

    const user = await UserRepository.findByEmail(email);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error('Senha inválida');
    }

    if (user.active !== 'S') {
      throw new Error('Usuário inativo');
    }

    return user;
  }

  async update(id, data) {
    if (!id) throw new Error('Id é obrigatório');
    if (!data.password) throw new Error('Senha é obrigatória');
    data.password = await bcrypt.hash(data.password, 10);
    return await UserRepository.update(id, data);
  }


  async listByUserId(id) {
    if (!id) throw new Error('Id é obrigatório');

    return await UserRepository.listByUserId(id);
  }
}

module.exports = new UserService();
