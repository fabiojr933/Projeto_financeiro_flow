const ReportService = require('../services/ReportService');

class DashboardController {

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
            const transaction = await ReportService.listAll(req.session.user.id);
            const category = await ReportService.sumListCategory(req.session.user.id, date1, date2);
            const account = await ReportService.sumListAccount(req.session.user.id, date1, date2);
            const familyMember = await ReportService.sumListFamilyMember(req.session.user.id, date1, date2);
            const transactionDate = await ReportService.sumListTransactionDate(req.session.user.id, date1, date2);
        
            res.render('dashboard/index', { date1, date2, category, account, familyMember, transactionDate, transaction });

        } catch (error) {
            req.flash('error', 'Erro: ' + error.message);
            return res.redirect('/login');
        }
    }
}

module.exports = new DashboardController();
