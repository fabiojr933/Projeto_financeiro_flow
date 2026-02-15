const { GoogleGenerativeAI } = require("@google/generative-ai");

class GeminiService {

  constructor() {
    // cria a instância com a API KEY
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    // escolhe o modelo
    this.model = this.genAI.getGenerativeModel({
      model: "gemini-3-flash-preview"
    });
  }
  async gerarInsightsFinanceiros(despesa, receita) {
    const prompt = `
          Você é um consultor financeiro profissional.

          RETORNE APENAS JSON VÁLIDO.
          NÃO escreva texto fora do JSON.
          NÃO use comentários.
          NÃO use markdown.

          O formato DEVE ser exatamente este:

          {
            "health_score": number,
            "resumo_financeiro": {
              "receita_total": number,
              "despesa_total": number,
              "saldo_positivo": number,
              "taxa_de_poupanca": string
            },
            "dicas": string[]
          }

          Dados de despesa:
          ${JSON.stringify(despesa)}

          Dados de receita:
          ${JSON.stringify(receita)}
          `;

    const result = await this.model.generateContent(prompt);

    return result.response.text();
  }

}

module.exports = new GeminiService();