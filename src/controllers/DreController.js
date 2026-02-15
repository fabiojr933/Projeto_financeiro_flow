const ReportService = require('../services/ReportService');

class DreController {

    async index(req, res) {
        try {
            let date1 = null;
            let date2 = null;

            if (req.method === 'GET') {
                const now = new Date();

                // sempre primeiro dia do mês atual
                date1 = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0);

                // sempre último dia do mês atual
                date2 = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

                // converte para input type="date" (YYYY-MM-DD)
                date1 = `${date1.getFullYear()}-${String(date1.getMonth() + 1).padStart(2, '0')}-01`;

                const lastDay = new Date(
                    now.getFullYear(),
                    now.getMonth() + 1,
                    0
                ).getDate();

                date2 = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${lastDay}`;

            } else {
                date1 = req.body.date1;
                date2 = req.body.date2;
            }
            const categoryDespesa = await ReportService.sumListCategoryDespesa(req.session.user.id, date1, date2);
            const categoryReceita = await ReportService.sumListCategoryReceita(req.session.user.id, date1, date2);

            const totalReceita = categoryReceita.reduce((acc, item) => {
                return acc + Number(item.amount);
            }, 0);

            const totalDespesa = categoryDespesa.reduce((acc, item) => {
                return acc + Number(item.amount);
            }, 0);

            const liquido = totalReceita-totalDespesa;

            //Eficiência (%) = (Lucro Líquido ÷ Receita Total) × 100
            const Efficiency = (liquido / totalReceita) * 100; 

            res.render('dre/index', { categoryDespesa, categoryReceita, totalReceita, totalDespesa, liquido, Efficiency,
                date1, date2
             });
        } catch (error) {
            req.flash('error', 'Não foi possível carregar os dados de lançamentos.');
            return res.redirect('/dashboard');
        }
    }
}

module.exports = new DreController();
