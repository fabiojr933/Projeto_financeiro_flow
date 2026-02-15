const ReportRepository = require('../repositories/ReportRepository');

class ReportService {

  async sumListCategoryDespesa(user_id, date1, date2) {
    if (!user_id) throw new Error('user_id é obrigatório');
    if (!date1) throw new Error('data inicial é obrigatório');
    if (!date2) throw new Error('data final é obrigatório');
    return ReportRepository.sumListCategoryDespesa(user_id, date1, date2);
  }

  async sumListCategoryReceita(user_id, date1, date2) {
    if (!user_id) throw new Error('user_id é obrigatório');
    if (!date1) throw new Error('data inicial é obrigatório');
    if (!date2) throw new Error('data final é obrigatório');
    return ReportRepository.sumListCategoryReceita(user_id, date1, date2);
  }

  async sumListCategory(user_id, date1, date2) {
    if (!user_id) throw new Error('user_id é obrigatório');
    if (!date1) throw new Error('data inicial é obrigatório');
    if (!date2) throw new Error('data final é obrigatório');
    return ReportRepository.sumListCategory(user_id, date1, date2);
  }
  
  async sumListAccount(user_id, date1, date2) {
    if (!user_id) throw new Error('user_id é obrigatório');
    if (!date1) throw new Error('data inicial é obrigatório');
    if (!date2) throw new Error('data final é obrigatório');
    return ReportRepository.sumListAccount(user_id, date1, date2);
  }

  async sumListFamilyMember(user_id, date1, date2) {
    if (!user_id) throw new Error('user_id é obrigatório');
    if (!date1) throw new Error('data inicial é obrigatório');
    if (!date2) throw new Error('data final é obrigatório');
    return ReportRepository.sumListFamilyMember(user_id, date1, date2);
  }

  async sumListTransactionDate(user_id, date1, date2) {
    if (!user_id) throw new Error('user_id é obrigatório');
    if (!date1) throw new Error('data inicial é obrigatório');
    if (!date2) throw new Error('data final é obrigatório');
    return ReportRepository.sumListTransactionDate(user_id, date1, date2);
  }

    async listAll(user_id) {
    if (!user_id) throw new Error('user_id é obrigatório');
    return ReportRepository.listAll(user_id);
  }
}

module.exports = new ReportService();
