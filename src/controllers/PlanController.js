class PlanController {

    async index(req, res) {
        try {
            res.render('plan/index');
        } catch (error) {
            req.flash('error', error.message);
            return res.redirect('/dashboard/plan');
        }
    }

    async plan(req, res) {
        try {
            res.render('plan/plano');
        } catch (error) {
            req.flash('error', error.message);
            return res.redirect('/dashboard/plan');
        }
    }

    async subscribe(req, res) {
        try {
            res.render('plan/assinatura');
        } catch (error) {
            req.flash('error', error.message);
            return res.redirect('/dashboard/plan');
        }
    }


}

module.exports = new PlanController();
