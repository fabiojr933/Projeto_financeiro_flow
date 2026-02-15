const UserService = require('../services/UserService.js');
const MetaDadosService = require('../services/MetaDadosService.js');

class UserController {

  async profile(req, res) {
    try {
      const data = await UserService.listByUserId(req.session.user.id);      
      res.render('user/profile', { data });
    } catch (error) {
      req.flash('info', error.message);
      return res.redirect('/dashboard/usuario/perfil');
    }
  }
  async save(req, res) {
    try {
      const user_id = await UserService.save(req.body);
      await MetaDadosService.importFromMetadataDespesa(user_id.id);
      await MetaDadosService.importFromMetadataReceita(user_id.id);
      req.flash('info', 'Usuário cadastrado com sucesso!');
      res.redirect('/login');
    } catch (error) {
      req.flash('error', error.message);
      return res.redirect('/login');
    }
  }
  async update(req, res) {
    try {
      await UserService.update(req.session.user.id, req.body);
      req.flash('info', 'Perfil atualizado com sucesso');
      res.redirect('/dashboard/usuario/perfil');
    } catch (error) {
      req.flash('error', error.message);
      return res.redirect('/dashboard/usuario/perfil');
    }
  }
}

module.exports = new UserController();
