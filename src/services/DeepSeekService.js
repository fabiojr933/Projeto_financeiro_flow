const OpenAI = require("openai");

class DeepSeekService {
  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.DEEPSEEK_API_KEY,
      baseURL: process.env.DEEPSEEK_URL
    });

    this.model = "deepseek-reasoner";
  }

  async gerarInsightsFinanceiros(despesa, receita) {
   const prompt = `
Você é um consultor financeiro profissional.

Analise os dados abaixo de despesas e receitas e avalie a saúde financeira geral do período.

Dados de receita:
[receita: ${JSON.stringify(receita)}]

Dados de despesa:
[despesa: ${JSON.stringify(despesa)}]

Regras de cálculo:

1. Cálculo base:
- Calcule total das receitas.
- Calcule total das despesas.
- Calcule o valor líquido:
  liquido = total das receitas - total das despesas.

2. Cálculo do health_score:
  health_score = (liquido / total das receitas) x 100
  obs: deixa health_score com apenas 2 casa decimal apos a virgula.
  
Dicas:
- Gere no máximo 5 dicas.
- Cada dica deve ser curta, clara e acionável.
- Baseie as dicas exclusivamente nos dados enviados.
- Priorize categorias com maior impacto financeiro.
- Se houver saldo negativo, a primeira dica deve tratar disso.

Formato de resposta:
Retorne um JSON válido.
Não escreva texto fora do JSON.
Não use comentários.
Não use markdown.

Formato EXATO:


{
  "health_score": number,
  total_das_receitas: number,
  total das despesas: number,
  liquido, number,
  "dicas": string[]
}

me mostre a conta como que vc chegou nesse valor do health_score
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
