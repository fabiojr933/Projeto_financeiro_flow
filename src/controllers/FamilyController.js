const FamilyService = require('../services/FamilyService');

class FamilyController {

    async index(req, res) {
        try {
            const data = await FamilyService.listByUserId(req.session.user.id);      
            res.render('family/index', { data });
        } catch (error) {
            req.flash('error', error.message);
            return res.redirect('/dashboard/familia');
        }
    }
    async save(req, res) {
        try {
            if (req.body.id) {
                let id = req.body.id;
                const data = {
                    'name': req.body.name,
                    'relationship': req.body.relationship,
                    'color_code': req.body.color_code,
                }
                await FamilyService.update(id, data);
                req.flash('info', 'Cadastro editado com sucesso');
            } else {
                const data = {
                    'user_id': req.session.user.id,
                    'name': req.body.name,
                    'relationship': req.body.relationship,
                    'color_code': req.body.color_code,
                }
                await FamilyService.save(data)
                req.flash('info', 'Cadastro realizado com sucesso');
            }
            res.redirect('/dashboard/familia');
        } catch (error) {
            req.flash('error', error.message);
            return res.redirect('/dashboard/familia');
        }
    }
    async delete(req, res) {
        try {
            await FamilyService.delete(req.body.id, req.session.user.id);
            req.flash('info', 'Cadastro excluido com sucesso');
            res.redirect('/dashboard/familia');
        } catch (error) {           
            req.flash('error', error.message);
            return res.redirect('/dashboard/familia');
        }
    }
}

module.exports = new FamilyController();
