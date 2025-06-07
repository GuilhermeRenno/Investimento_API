# Controle de Investimentos | Back-End (API)

[![Ver Repositório Front-End](https://img.shields.io/badge/Ver-Front--End-2ea44f?style=for-the-badge)](https://github.com/GuilhermeRenno/investimentos_FRONT) 
## ❯ Sobre o Projeto

Esta é a API back-end da aplicação "Controle de Investimentos". Ela serve como o cérebro do sistema, responsável por gerenciar, validar e persistir todos os dados relacionados aos ativos financeiros.

Este projeto foi desenvolvido como um teste prático para demonstrar habilidades em desenvolvimento de APIs RESTful.

## 🛠️ Tecnologias Utilizadas

- **Node.js:** Ambiente de execução do JavaScript no servidor.
- **Express:** Framework para a construção da API e gerenciamento de rotas.
- **CORS:** Middleware para permitir requisições de origens diferentes (neste caso, do front-end).

## ✨ Funcionalidades

- **CRUD Completo:** Cadastro, Listagem, Atualização e Exclusão de investimentos.
- **Validações de Negócio:**
  - O valor do investimento deve ser maior que zero.
  - A data do investimento não pode ser futura.

## 🚀 Como Executar

Siga os passos abaixo para executar a API localmente.

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/GuilhermeRenno/Investimento_API.git](https://github.com/GuilhermeRenno/Investimento_API.git)
    ```

2.  **Acesse a pasta do projeto:**
    ```bash
    cd Investimento_API
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Inicie o servidor:**
    ```bash
    npm start
    ```

> O servidor estará em execução na porta `3000`. Ex: `http://localhost:3000`

## Endpoints da API

| Método | Rota                  | Descrição                                |
| :----- | :-------------------- | :--------------------------------------- |
| `GET`  | `/investimentos`      | Retorna todos os investimentos.          |
| `POST` | `/investimentos`      | Cria um novo investimento.               |
| `PUT`  | `/investimentos/:id`  | Atualiza um investimento existente.      |
| `DELETE`| `/investimentos/:id`  | Deleta um investimento existente.        |

<hr>

_Desenvolvido por Guilherme Renno._
