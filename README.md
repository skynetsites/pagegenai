# PageGen AI - Gerador de Landing Pages com Inteligência Artificial

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7-purple?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38B2AC?logo=tailwindcss)
![Gemini](https://img.shields.io/badge/Gemini-Advanced-purple?logo=openai)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT/Gemini-black?logo=openai)
![License](https://img.shields.io/badge/license-MIT-green)


# Sobre o projeto

O **PageGen AI** é uma aplicação web que tem como objetivo transformar ideias em **Landing Pages estruturadas** de forma rápida utilizando **Inteligência Artificial**.

A proposta do projeto é ajudar desenvolvedores, empreendedores e criadores digitais a **validar ideias mais rapidamente**, gerando estruturas iniciais de páginas que podem servir como base para produtos, serviços ou campanhas.

Para gerar as páginas automaticamente, a aplicação utiliza **Inteligência Artificial através da API do Google Gemini**, que recebe uma ideia do usuário e retorna sugestões estruturadas de conteúdo para uma Landing Page.

Essa abordagem acelera o processo de criação e reduz o tempo necessário para estruturar páginas iniciais de projetos.

O projeto ainda está em **fase BETA**, então novas funcionalidades e melhorias continuam sendo desenvolvidas.

## Preview

### Demonstração da Aplicação

Confira abaixo como o **PageGen AI** transforma ideias em landing pages de forma rápida e prática.  
Acompanhe o funcionamento pelo GIF a seguir:

![Preview do projeto](./public/preview.gif)

# Tecnologias utilizadas

Este projeto foi desenvolvido utilizando as seguintes tecnologias:

- React
- TypeScript
- Vite
- TailwindCSS
- React Router
- Lucide Icons
- Google Gemini API (IA generativa)

# Integração com Inteligência Artificial

A geração das Landing Pages é feita utilizando **Inteligência Artificial através da API do Google Gemini**.

A aplicação envia instruções para o modelo de IA com base na ideia informada pelo usuário. O modelo retorna uma estrutura inicial de conteúdo que pode ser utilizada para montar uma Landing Page.

Para utilizar essa funcionalidade, é necessário configurar uma **chave da API (API Key)** através de variáveis de ambiente.

Isso garante mais segurança e evita expor a chave diretamente no código.

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

# Desafio enfrentado durante o desenvolvimento

Um dos principais desafios foi estruturar uma forma de transformar **ideias em páginas organizadas automaticamente**, sem perder a lógica de uma boa Landing Page.

Durante o desenvolvimento ficou claro que não basta apenas gerar conteúdo automaticamente. É necessário organizar corretamente os blocos da página para garantir uma boa experiência para o usuário.

Outro desafio foi integrar a **API de Inteligência Artificial** de forma que as respostas geradas fossem úteis para estruturar uma página real.

# Aprendizados

Durante a criação do projeto alguns aprendizados importantes foram:

- Estruturação de aplicações modernas com **React + Vite**
- Uso do **TailwindCSS** para criação de interfaces rápidas
- Organização de rotas utilizando **React Router**
- Integração com **APIs de Inteligência Artificial**
- Uso de **variáveis de ambiente para proteger chaves de API**
- Estruturação de projetos escaláveis no frontend

# Próximos passos do projeto

Algumas melhorias planejadas:

- Novas ferramentas baseadas em IA
- Mais opções de geração de páginas
- Melhorias na experiência do usuário
- Novos templates de Landing Pages
- Melhorias na geração de conteúdo pela IA

# Contribuição

Se quiser contribuir com feedback ou sugestões, fique à vontade para abrir uma **[Issue](https://github.com/skynetsites/pagegenai/issues)** ou **[enviar ideias](https://github.com/skynetsites/pagegenai/pulls)**.  

**Ajude a manter esse projeto!**

Este é um projeto gratuito e independente. Sua doação via PIX ajuda a manter a plataforma e a IA, para continuarmos oferecendo este serviço:

![QR Code de Contribuição](https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=00020126580014BR.GOV.BCB.PIX013605ed170a-9ddf-4526-94ac-d17affc230bc5204000053039865802BR5925Francisco%20Isaias%20Oliveira6009SAO%20PAULO62140510dvfzXaciz76304B02E)

# Deploy

Aplicação disponível em:

https://pagegenai-nu.vercel.app/

# Licença

Este projeto está licenciado sob a **Licença MIT**.

Veja o arquivo **[LICENSE](./LICENSE)** para mais detalhes.

## Autor

Projeto desenvolvido por **Isaias Oliveira**.  
Conecte-se comigo no **[in/skynetsites](https://www.linkedin.com/in/skynetsites/)**