# PageGen AI - Gerador de Landing Pages com Inteligência Artificial

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7-purple?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38B2AC?logo=tailwindcss)
![Gemini](https://img.shields.io/badge/Gemini-Advanced-purple?logo=openai)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT/Gemini-black?logo=openai)
![License](https://img.shields.io/badge/license-MIT-green)

# Sobre o projeto

O **PageGen AI** transforma ideias em **Landing Pages estruturadas** de forma rápida usando **Inteligência Artificial**.  
A aplicação é voltada para desenvolvedores, empreendedores e criadores digitais, ajudando a validar ideias rapidamente com uma base inicial de páginas.

A IA utilizada é a **Google Gemini API**, que recebe uma ideia do usuário e retorna sugestões estruturadas de conteúdo para a landing page.  
O projeto está em **fase BETA** e novas funcionalidades estão sendo desenvolvidas continuamente.

# Preview

### Demonstração da Aplicação

Confira abaixo como o **PageGen AI** transforma ideias em landing pages rapidamente:

![Preview do projeto](./public/preview.gif)

# Tecnologias utilizadas

- React  
- TypeScript  
- Vite  
- TailwindCSS  
- React Router  
- Lucide Icons  
- Google Gemini API  

# Integração com Inteligência Artificial

A geração das Landing Pages é feita utilizando **IA via Google Gemini API**.  
Para isso, é necessário configurar uma **API Key** através de variáveis de ambiente, garantindo **segurança e privacidade**.

# Como executar o projeto localmente

Clone o repositório com:

git clone https://github.com/skynetsites/pagegenai

Entre na pasta do projeto:

cd pagegenai

Instale as dependências:

npm install

### Configuração da API

1. Crie um arquivo `.env` na raiz do projeto (não versionado) com:

GEMINI_API_KEY=sua_chave_aqui

2. Adicione `.env` ao `.gitignore` para não enviar sua chave para o GitHub.  
> ⚠️ No Windows, **use `.env`** em vez de `.env.local` para que o Node e o Vercel Dev carreguem corretamente.

### Executando o projeto

**Recomendado (Frontend + Backend):**

npx vercel dev

- Acesse: http://localhost:3000  
- O backend `/api/gemini` funciona corretamente, igual à produção.  

**Opcional – Apenas Frontend (Vite):**

npm run dev

- Acesse: http://localhost:5173  
- A API `/api/gemini` pode não funcionar neste modo.

# Desafios enfrentados

- Estruturar **ideias em páginas organizadas automaticamente**  
- Integrar a **IA de forma útil** para gerar conteúdo que realmente monte uma landing page funcional

# Aprendizados

- Estruturação moderna com **React + Vite**  
- Criação rápida de interfaces com **TailwindCSS**  
- Organização de rotas com **React Router**  
- Integração com APIs de **IA generativa**  
- Uso de **variáveis de ambiente** para proteger chaves  

# Próximos passos

- Novas ferramentas baseadas em IA  
- Mais opções de geração de páginas  
- Novos templates  
- Melhorias na geração de conteúdo  

# Contribuição

Se quiser contribuir, abra uma **issue** ou envie **pull requests**.  
Doações via PIX ajudam a manter o projeto:

![QR Code de Contribuição](https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=00020126580014BR.GOV.BCB.PIX013605ed170a-9ddf-4526-94ac-d17affc230bc5204000053039865802BR5925Francisco%20Isaias%20Oliveira6009SAO%20PAULO62140510dvfzXaciz76304B02E)

# Deploy

Aplicação disponível em:  
https://pagegenai-nu.vercel.app/

# Licença

Licenciado sob **MIT**. Veja [LICENSE](./LICENSE) para mais detalhes.

# Autor

**Isaias Oliveira**  
Conecte-se: [in/skynetsites](https://www.linkedin.com/in/skynetsites/)