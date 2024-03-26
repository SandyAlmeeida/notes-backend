# Projeto Notas Backend

Este é o projeto backend de um sistema de notas que inclui uma relação de muitos para muitos com as tags.

## Requisitos do Sistema

- Node.js 20.11.1 ou superior
- MySQL versão 8.0

## Configuração do Ambiente

### 1. Instalação do Node.js:

- Faça o download e a instalação do Node.js a partir do [site oficial](https://nodejs.org/).
- Verifique a instalação executando o seguinte comando no terminal:
  ```bash
  node --version
  ```

### 2. Instalação do MySQL:

- Faça o download e a instalação do MySQL a partir do [site oficial](https://dev.mysql.com/downloads/).
- Siga as instruções de instalação fornecidas pelo MySQL.
- Verifique a instalação executando o seguinte comando no terminal:
  ```bash
  mysql --version
  ```
- Crie um usuário e senha para o projeto no mysql
  ```bash
  sudo mysql
  ```
  ```bash
  CREATE USER 'username'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
  ```
  ```bash
  FLUSH PRIVILEGES;
  ```
  ```bash
  exit;
  ```

## Configuração do Projeto

### 1. Clonar o Repositório:

Clone este repositório para sua máquina local usando o seguinte comando:
```bash
git clone git@github.com:SandyAlmeeida/notes-backend.git
```

### 2. Instalar Dependências:

Navegue até o diretório do projeto e instale as dependências executando:
```bash
cd notes-backend
npm install
```

### 3. Configuração do Banco de Dados:

- Crie um banco de dados MySQL com o nome `nome_do_banco`.
- Configure as credenciais do banco de dados no arquivo `config/db.js`.

### 4. Executar Migrações:

Execute as migrações do banco de dados usando o seguinte comando:
```bash
npx sequelize-cli db:migrate
```

## Executando o Projeto

Para iniciar o projeto, execute o seguinte comando no terminal:
```bash
node app.js
```

O projeto estará disponível em [http://localhost:3000](http://localhost:3000).

