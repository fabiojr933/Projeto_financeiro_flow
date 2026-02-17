const ReportService = require('../services/ReportService');
const DeepSeekService = require('../services/DeepSeekService');
class InsightController {
    async index(req, res) {
        let date1 = null;
        let date2 = null;
        try {

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
            const userId = req.session.user.id;

            const despesa = await ReportService.sumListCategoryDespesa(userId, date1, date2);
            const receita = await ReportService.sumListCategoryReceita(userId, date1, date2);

            const dados = await DeepSeekService.gerarInsightsFinanceiros(despesa, receita);

            res.render('insight/index', { dados, date1, date2 });
        } catch (error) {
            res.render('insight/index', { date1, date2 });
        }
    }
}

module.exports = new InsightController();
