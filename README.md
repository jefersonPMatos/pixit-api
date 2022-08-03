# PIXIT- BACKEND(API)

Projeto criado com Node.Js + Eexpress.Js + Sequelize + MySQL

## Instruções para rodar o projeto na sua própria máquina.

### `git clone`

Clone este repositório.

### `npm install`

Intala todas as dependências do projeto.

### `nodemon start`

Roda o projeto na porta http://localhost:5000

### `Banco de dados`

Crie o banco de dados na sua máquina: ###`sequelize db:migrate` [Lembre-se de instalar o MySQL e fazer conexão com o XAMPP]

Rode as migrations: ###`npx sequelize-cli db:migrate`

### `rotas`

- "user/cadastrar" - "POST". Registra um novo usuário.
- "user/login" - "POST". Login de usuário.
- "user/:id" - "POST". Atualiza dados do usuário.
- "user/:id" - "DELETE". Delete o usuário.

**Nota: Você pode fazer as requisições pelo Insomina/Postman ou pelo frontend da aplicação. Ver: https://github.com/jefersonPMatos/pixit-front **
