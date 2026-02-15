const User = require('./User');
const FamilyMember = require('./Family_member');
const Category = require('./Category')
const Account = require('./Account');
const Transaction = require('./Transaction');

// 🔗 RELACIONAMENTOS
User.hasMany(FamilyMember, {
  foreignKey: 'user_id',
  as: 'familyMember'
});

FamilyMember.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user'
});

Category.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user'
});

Account.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user'
});



Transaction.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user'
});

Transaction.belongsTo(FamilyMember, {
  foreignKey: 'family_member_id',
  as: 'family_member'
});

Transaction.belongsTo(Category, {
  foreignKey: 'category_id',
  as: 'category'
});

Transaction.belongsTo(Account, {
  foreignKey: 'account_id',
  as: 'account'
});



module.exports = {
  User,
  FamilyMember,
  Category,
  Account,
  Transaction
};
