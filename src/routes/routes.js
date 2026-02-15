const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const user = require('../controllers/UserController');
const dashboard = require('../controllers/DashboardController');
const login = require('../controllers/LoginController');
const category = require('../controllers/CategoryController');
const family = require('../controllers/FamilyController');
const dre = require('../controllers/DreController');
const transaction = require('../controllers/TransactionController');
const account = require('../controllers/AccountController');
const insight = require('../controllers/InsightController');
const plan = require('../controllers/PlanController');

router.get('/', authMiddleware, dashboard.index);

// dashboard
router.get('/dashboard', authMiddleware, dashboard.index);
router.post('/dashboard', authMiddleware, dashboard.index);

// login
router.get('/login', login.index);
router.get('/login/register', login.register);
router.post('/login/authenticate', login.authenticate);
router.get('/login', login.index);
router.get('/login/logout', login.logout);

// user 
router.get('/dashboard/usuario/perfil', authMiddleware, user.profile);
router.post('/dashboard/usuario/salvar',  user.save);
router.post('/dashboard/usuario/atualizar', authMiddleware, user.update);

//Category
router.get('/dashboard/categoria', authMiddleware, category.index);
router.post('/dashboard/categoria', authMiddleware, category.save);
router.post('/dashboard/categoria/delete', authMiddleware, category.delete);


//family
router.get('/dashboard/familia', authMiddleware, family.index);
router.post('/dashboard/familia', authMiddleware, family.save);
router.post('/dashboard/familia/delete', authMiddleware, family.delete);

//dre
router.get('/dashboard/dre', authMiddleware, dre.index);
router.post('/dashboard/dre', authMiddleware, dre.index);

//transaction
router.get('/dashboard/lancamento', authMiddleware, transaction.index);
router.post('/dashboard/lancamento', authMiddleware, transaction.index);
router.post('/dashboard/lancamento/salvar', authMiddleware, transaction.save);
router.get('/dashboard/lancamento/delete/:id', authMiddleware, transaction.delete);

//account
router.get('/dashboard/contas', authMiddleware, account.index);
router.post('/dashboard/contas', authMiddleware, account.save);
router.post('/dashboard/contas/delete', authMiddleware, account.delete);

//insight
router.get('/dashboard/consultor', authMiddleware, insight.index);
router.post('/dashboard/consultor', authMiddleware, insight.index);

// plan
router.get('/dashboard/plano/index', authMiddleware, plan.index);
router.get('/dashboard/plano', authMiddleware, plan.plan);
router.get('/dashboard/assinatura', authMiddleware, plan.subscribe);

module.exports = router;