# Desafio Front-End - Recomendador de Produtos RD Station

Este projeto foi desenvolvido como parte do processo seletivo para Pessoa Desenvolvedora na RD Station. A aplicação consiste em um sistema de recomendação de produtos que, com base nas preferências e funcionalidades selecionadas pelo usuário, sugere as soluções mais adequadas do portfólio da RD Station.

### Resultado Final

![Resultado da Aplicação]

###  Tecnologias Utilizadas

* **React.js:** Biblioteca principal para a construção da interface.
* **Tailwind CSS:** Framework para estilização rápida e responsiva.
* **JSON Server:** Para simular uma API RESTful e servir os dados dos produtos.

### Pré-requisitos

Antes de começar, você vai precisar ter as seguintes ferramentas instaladas em sua máquina:
* [Node.js](https://nodejs.org/en/) (versão 18.3 ou superior)
* [Yarn](https://classic.yarnpkg.com/en/docs/install/) (gerenciador de pacotes)

###  Instalação

Siga os passos abaixo para configurar o ambiente de desenvolvimento:

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/kyliews/rd-station-challenge-kyliesantos.git](https://github.com/kyliews/rd-station-challenge-kyliesantos.git)
    ```

2.  **Navegue até a pasta do projeto:**
    ```bash
    cd rd-station-challenge-kyliesantos
    ```

3.  **Execute o script de instalação:**
    Este script instalará as dependências tanto do `frontend` quanto do `backend`.
    ```bash
    ./install.sh
    ```
    *(Caso esteja no Windows e o `.sh` não funcione, instale manualmente: `cd backend && yarn install` e depois `cd frontend && yarn install`)*

### ▶️ Como Executar a Aplicação

Para rodar o projeto, você precisará de **dois terminais** abertos na raiz do projeto.

1.  **Terminal 1: Inicie o Backend (API)**
    ```bash
    cd backend
    yarn start
    ```
    *O servidor da API estará rodando em `http://localhost:3001`.*

2.  **Terminal 2: Inicie o Frontend (React)**
    ```bash
    cd frontend
    yarn start
    ```
    *A aplicação estará acessível em `http://localhost:3000`.*

---
Desenvolvido por **Kylie santos**.