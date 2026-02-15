const CategoryService = require('../services/CategoryService');


class CategoryController {

    async index(req, res) {
        try {
            const data = await CategoryService.listByUserId(req.session.user.id);
            res.render('category/index', { data });
        } catch (error) {
            req.flash('error', error.message);
            return res.redirect('/dashboard/categoria');
        }
    }
    async save(req, res) {
        try {
            if (req.body.id) {
                let id = req.body.id;
                const data = {
                    'name': req.body.name,
                    'type': req.body.type,
                    'icon': req.body.icon,
                    'color_code': req.body.color_code,
                }
                await CategoryService.update(id, data);
                req.flash('info', 'Cadastro editado com sucesso');
            } else {
                const data = {
                    'user_id': req.session.user.id,
                    'name': req.body.name,
                    'type': req.body.type,
                    'icon': req.body.icon,
                    'color_code': req.body.color_code,
                }
                await CategoryService.save(data)
                req.flash('info', 'Cadastro realizado com sucesso');
            }
            res.redirect('/dashboard/categoria');
        } catch (error) {
            req.flash('error', error.message);
            return res.redirect('/dashboard/categoria');
        }
    }
    async delete(req, res) {
        try {
            await CategoryService.delete(req.body.id, req.session.user.id);
            req.flash('info', 'Cadastro excluido com sucesso');
            res.redirect('/dashboard/categoria');
        } catch (error) {
            req.flash('error', error.message);
            return res.redirect('/dashboard/categoria');
        }
    }
}

module.exports = new CategoryController();
