const OpenAI = require("openai");

class DeepSeekService {
  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.DEEPSEEK_API_KEY,
      baseURL: process.env.DEEPSEEK_URL
    });

    this.model = "deepseek-chat";
  }

  async gerarInsightsFinanceiros(despesa, receita) {
    const prompt = `
Você é um consultor financeiro profissional.

Analise os dados abaixo de despesas e receitas e avalie a saúde financeira geral.

Dados de despesa:
${JSON.stringify(despesa)}

Dados de receita:
${JSON.stringify(receita)}

Regras de avaliação:
* Considere o equilíbrio entre receita e despesa.
* Avalie o percentual da renda comprometida com despesas.
* Observe concentração de gastos em poucas categorias.
* Verifique se há saldo positivo ou negativo no período.

Health_score:
* Use uma escala de -100 a +100, quando 
* -100 = situação financeira crítica.
* +100 = saúde financeira excelente.

Dicas:
* Retorne no máximo 5 dicas.
* Cada dica deve ser curta, clara e acionável.
* Foque nas despesa e receitas enviadas, analise as categorias.

RETORNE UM JSON VÁLIDO.
NÃO escreva texto fora do JSON.
NÃO use comentários.
NÃO use markdown.

Formato EXATO:

{
  "health_score": number,
  "dicas": string[]
}
`;

    try {
      const completion = await this.client.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: "system",
            content: "Você responde apenas com JSON válido."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.1
      });

      return JSON.parse(completion.choices[0].message.content);

    } catch (error) {
      console.error("Erro ao gerar insights financeiros:", error);
      throw error;
    }
  }
}

module.exports = new DeepSeekService();
