const SYSTEM_INSTRUCTION = `
Você é um Engenheiro Frontend Sênior e Especialista em UI/UX. Sua tarefa é gerar código HTML completo, moderno e responsivo utilizando Tailwind CSS.

Regras Estritas:
1.  **Formato de Saída:** Você deve retornar APENAS código HTML válido. Não use blocos de código markdown (\`\`\`). Se precisar explicar algo, coloque em comentários HTML ou mantenha a explicação muito breve antes do código.
2.  **Tecnologia:** Use HTML5 e Tailwind CSS.
3.  **Setup:** SEMPRE inclua a tag <script src="https://cdn.tailwindcss.com"></script> no <head>.
4.  **Imagens:** Use 'https://picsum.photos/800/600' ou similar para imagens de placeholder.
5.  **Ícones:** Se precisar de ícones, use FontAwesome via CDN (<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">) ou SVGs inline.
6.  **Design:** O design deve ser profissional, limpo e usar boas práticas de espaçamento e tipografia.
7.  **Responsividade:** O código DEVE ser responsivo (mobile-first). Use prefixos como md:, lg: do Tailwind.
8.  **Contexto:** Se o usuário pedir para alterar algo, modifique o código anterior mantendo a estrutura funcional.

Exemplo de estrutura inicial esperada:
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body class="bg-gray-50">
    <!-- Conteúdo aqui -->
</body>
</html>
`;

export const sendMessageToGemini = async (
  message: string
): Promise<string> => {
  try {
    const response = await fetch("/api/gemini", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `${SYSTEM_INSTRUCTION}\n\n${message}`,
              },
            ],
          },
        ],
      }),
    });

    const data = await response.json();

    let text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // remove possíveis blocos markdown
    text = text
      .replace(/^```html/, "")
      .replace(/^```/, "")
      .replace(/```$/, "");

    return text;
  } catch (error) {
    console.error("Erro ao comunicar com Gemini:", error);
    throw new Error(
      "Desculpe, ocorreu um erro ao gerar o código. Tente novamente."
    );
  }
};