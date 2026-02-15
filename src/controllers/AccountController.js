const AccountService = require('../services/AccountService');

class AccountController {

    async index(req, res) {
        try {
            const data = await AccountService.listByUserId(req.session.user.id);     
            res.render('account/index', { data });
        } catch (error) {
            req.flash('error', error.message);
            return res.redirect('/dashboard/contas');
        }
    }

    async save(req, res) {
        try {           
            if (req.body.id) {
                let id = req.body.id;
                const data = {
                    'type': req.body.type,
                    'institution_name': req.body.institution_name                  
                }
                await AccountService.update(id, data);
                req.flash('info', 'Cadastro editado com sucesso');
            } else {
                const data = {
                    'type': req.body.type,
                    'institution_name': req.body.institution_name,                   
                    'user_id': req.session.user.id
                }
                await AccountService.save(data)
                req.flash('info', 'Cadastro realizado com sucesso');
            }
            res.redirect('/dashboard/contas');
        } catch (error) {
            req.flash('error', error.message);
            return res.redirect('/dashboard/contas');
        }
    }
    async delete(req, res) {
        try {
            await AccountService.delete(req.body.id, req.session.user.id);
            req.flash('info', 'Cadastro excluido com sucesso');
            res.redirect('/dashboard/contas');
        } catch (error) {
            req.flash('error', error.message);
            return res.redirect('/dashboard/contas');
        }
    }

}

module.exports = new AccountController();
