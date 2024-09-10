# Página Oficial de Vinícius Capistrano

Esta é a página oficial do músico **Vinícius Capistrano**, construída usando **Next.js**. Ela permite que os usuários explorem as músicas de Vinícius, assistam a seus vídeos, vejam fotos de suas produções e leiam sua biografia. Uma área restrita está disponível para que Vinícius gerencie seu conteúdo, incluindo eventos, músicas, vídeos e leads.

## Demo
Acesse a demo da aplicação em [https://capistrano.vercel.app/](https://capistrano.vercel.app/).

## Índice

- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Configuração](#configuração)
- [Scripts](#scripts)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Área Restrita](#área-restrita)
- [Comunicação com a API](#comunicação-com-a-api)
- [Licença](#licença)

## Funcionalidades

- **Player de Música**: Os usuários podem ouvir as faixas de Vinícius em um player online.
- **Galeria de Vídeos**: Integração com o YouTube para exibir os últimos vídeos de Vinícius.
- **Galeria de Fotos**: Navegue por uma coleção de fotos de produções e eventos.
- **Seção de Biografia**: Saiba mais sobre a carreira e trajetória de Vinícius.
- **Área Restrita**: Vinícius pode fazer login para gerenciar seus eventos, músicas, vídeos e acessar informações de leads.

## Tecnologias Utilizadas

- **Framework**: [Next.js](https://nextjs.org/) (versão 14.2.8)
- **Gerenciamento de Estado**: [Zustand](https://github.com/pmndrs/zustand)
- **Estilização de UI**: [Tailwind CSS](https://tailwindcss.com/) com o plugin Prettier para formatação
- **Ícones**: [Phosphor Icons](https://phosphoricons.com/)
- **Formatação de Datas**: [date-fns](https://date-fns.org/)
- **Player de Mídia**: [React Player](https://github.com/cookpete/react-player)
- **Notificações**: [React Toastify](https://fkhadra.github.io/react-toastify/)
- **Outras Bibliotecas**: Axios, Lodash, clsx para utilitários e comunicação com APIs

## Configuração

### Requisitos

- **Node.js** (versão 18.x.x ou superior)
- **yarn** (versão 1.x.x ou superior)

### Instalação

1. Instale as dependências:
   yarn install

2. Execute o servidor de desenvolvimento:
   yarn dev

   A aplicação estará disponível em `http://localhost:3000`.

## Scripts

- `yarn dev`: Inicia o servidor de desenvolvimento.
- `yarn build`: Gera a versão de produção do app.
- `yarn start`: Executa a versão de produção do app.
- `yarn lint`: Verifica o código com ESLint.

## Estrutura do Projeto

├── api &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# Rotas de API  
├── components        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# Componentes reutilizáveis de UI  
├── dashboard         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    # Página de dashboard da área restrita  
├── login             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# Página de login para a área restrita  
└── sections          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# Sessions da página, como música, vídeos, etc.

## Área Restrita

- A área restrita é protegida por login, permitindo que Vinícius:
    - Atualize seus **eventos**, **músicas** e **vídeos**.
    - Visualize e gerencie **leads**, que são armazenados usando o **Pantry**, um serviço de armazenamento de JSON na nuvem.

## Comunicação com a API

- Toda a comunicação com o **Pantry** para armazenamento de JSON é feita através de **endpoints do servidor Next.js**, garantindo que informações sensíveis, como a URL e a chave de API do Pantry, não sejam expostas no código do cliente.
