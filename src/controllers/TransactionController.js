const AccountService = require('../services/AccountService');
const FamilyService = require('../services/FamilyService');
const CategoryService = require('../services/CategoryService');
const TransactionService = require('../services/TransactionService');

class TransactionController {

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

            const userId = req.session.user.id;
            const transaction = await TransactionService.listAll(userId, date1, date2);         

            const [accounts, familyMembers, categoryDespesa, categoryReceita] = await Promise.all([
                AccountService.listByUserId(userId),
                FamilyService.listByUserId(userId),
                CategoryService.listByUserIdDespesa(userId),
                CategoryService.listByUserIdReceita(userId)
            ]);

            res.render('transaction/index', {
                accounts,
                family: familyMembers,
                categoryDespesa,
                categoryReceita,
                transaction,
                date1,
                date2
            });

        } catch (error) {
            req.flash('error', 'Não foi possível carregar os dados de lançamentos. ', error.message);
            return res.redirect('/dashboard');
        }
    }
    async save(req, res) {
        try {
            const valores = [].concat(req.body.valor_parcela);
            const datas = [].concat(req.body.data_parcela);
            const parcelas = [].concat(req.body.parcela);

            const qtd = parcelas.length;

            if (
                valores.length !== datas.length ||
                valores.length !== parcelas.length
            ) {
                throw new Error('Quantidade de valores e datas das parcelas não confere');
            }

            const dados = valores.map((valor, index) => ({
                type: req.body.type,
                description: req.body.description,
                issued_date: req.body.issued_date,
                amount: parseFloat(valor.toString().replace(',', '.')),
                due_date: datas[index],
                category_id: parseInt(req.body.category_id, 10),
                account_id: parseInt(req.body.account_id, 10),
                quota: parseInt(parcelas[index], 10),
                family_member_id: parseInt(req.body.family_member_id, 10),
                'user_id': parseInt(req.session.user.id, 10)
            }));

            await Promise.all(
                dados.map(p => TransactionService.save(p))
            );
            req.flash('info', `${qtd > 1 ? 'Parcelas cadastradas' : 'Parcela cadastrada'} com sucesso.`);
            return res.redirect('/dashboard/lancamento');

        } catch (error) {
            req.flash('error', 'Error ', error.message);
            return res.redirect('/dashboard/lancamento');
        }
    }
    async delete(req, res) {
        try {
            await TransactionService.delete(req.params.id, req.session.user.id);
            req.flash('info', 'Lançamento excluido com sucesso');
            res.redirect('/dashboard/lancamento');
        } catch (error) {
            req.flash('error', error.message);
            return res.redirect('/dashboard/lancamento');
        }
    }
}

module.exports = new TransactionController();