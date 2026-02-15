const UserService = require('../services/UserService.js');

class LoginController {

  async index(req, res) {
    try {
      res.render('login/index');
    } catch (error) {
      req.flash('error', 'Erro: ' + error.message);
      return res.redirect('/login');
    }
  }
  async register(req, res) {
    try {
      res.render('login/register');
    } catch (error) {
      req.flash('error', 'Erro: ' + error.message);
      return res.redirect('/login');
    }
  }

  async save(req, res) {
    try {
      await UserService.save(req.body);
      req.flash('info', 'Cadastro realizado com sucesso');
      return res.redirect('/login');
    } catch (error) {
      req.flash('error', 'Erro: ' + error.message);
      return res.redirect('/login');
    }
  }
  async authenticate(req, res) {
    try {
      const user = await UserService.authenticate(req.body);

      req.session.user = {
        id: user.id,
        name: user.name,
        email: user.email
      };

      req.flash('info', 'Login realizado com sucesso');
      return res.redirect('/');

    } catch (error) {
      req.flash('error', error.message);
      return res.redirect('/login');
    }
  }
  async logout(req, res) {
    req.session.destroy(() => {
      res.redirect('/login');
    });
  }
}

module.exports = new LoginController();
