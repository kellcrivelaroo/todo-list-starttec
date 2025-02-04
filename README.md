# To-Do List - Projeto Full Stack

Este é um projeto de To-Do List desenvolvido como teste técnico para uma vaga full stack. O objetivo é demonstrar habilidades em desenvolvimento backend e frontend, bem como a capacidade de utilizar novas funcionalidades e tecnologias.

![image](https://github.com/user-attachments/assets/f2da66a2-058b-4848-b9bc-ae89f563b30d)


## Descrição

Este projeto é uma aplicação de lista de tarefas desenvolvida como teste técnico para uma vaga full stack. Aproveitei o escopo do projeto para implementar e explorar novas funcionalidades do Next.js 15 (versão canary) e do React v19, que ainda não foram lançadas oficialmente.

O projeto utiliza novos hooks e APIs do React v19, como:

- **`useActionState`**: Um hook para gerenciar o estado das ações de forma mais eficiente.
- **`useTransition`**: Um hook para gerenciar transições assíncronas e otimizar o tempo de resposta da interface.
- **`use`**: Uma nova API para simplificar a criação e uso de hooks personalizados.

A aplicação busca demonstrar o uso das mais recentes inovações em desenvolvimento frontend (React Server Components) e backend, combinando tecnologias de ponta e práticas de desenvolvimento modernas.

## Tecnologias Utilizadas

### Backend

- **Node.js**
- **Prisma**: ORM para PostgreSQL
- **Fastify**: Framework web rápido e eficiente
- **Zod**: Validação e parsing de dados
- **Jest**: Biblioteca de testes

### Frontend

- **Next.js 15** (versão canary): Framework React com novos hooks e API
- **React**: Biblioteca para construção de interfaces
- **Zod**: Validação e parsing de dados
- **Shadcn-ui**: Componentes com acessibilidade aprimorada

### Docker

- **PostgreSQL**: Banco de dados utilizado para persistência de dados

## Estrutura do Projeto

O projeto é dividido em duas pastas principais:

- `server`: Contém a API Node.js e o `docker-compose` para configurar o ambiente de desenvolvimento.
- `web`: Contém o frontend desenvolvido com Next.js.

## Como Executar o Projeto

### Backend

1. Navegue até a pasta `server`:
    ```bash
    cd server
    ```

2. Suba o banco de dados PostgreSQL com Docker:
    ```bash
    docker compose up
    ```

3. Instale as dependências do backend:
    ```bash
    yarn
    ```

4. Compile o projeto e aplique as migrações:
    ```bash
    yarn build
    ```

5. Inicie o servidor da API:
    ```bash
    yarn start
    ```

### Frontend

1. Navegue até a pasta `web`:

   ```bash
   cd ../web
   ```

2. Crie um arquivo `.env` com a URL da API:

   ```bash
   echo 'API_URL="http://localhost:3333"' > .env
   ```

3. Instale as dependências do frontend:

   ```bash
   yarn
   ```

4. Inicie o servidor de desenvolvimento:
   ```bash
   yarn dev
   ```

## Testes

Para rodar os testes do backend, use o comando:

```bash
yarn test
```
