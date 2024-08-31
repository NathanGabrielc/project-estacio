#!/bin/bash

# Configuração de variáveis
DB_USER="postgres"
DB_NAME="todo_list"
PSQL_PATH="C:/Program Files/PostgreSQL/16/bin"

# Adicionar PostgreSQL ao PATH temporariamente
export PATH=$PATH:"$PSQL_PATH"

# Criação do banco de dados
echo "Criando o banco de dados '${DB_NAME}'..."
createdb -U $DB_USER $DB_NAME

# Criação das tabelas
echo "Criando tabelas no banco de dados..."
psql -U $DB_USER -d $DB_NAME -c "
CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
"

# Instalação das dependências do backend
echo "Instalando dependências do backend..."
cd backend
npm install

# Instalação das dependências do frontend
echo "Instalando dependências do frontend..."
cd ../frontend
npm install

# Instalação das dependências globais
echo "Instalando dependências globais..."
npm install -g concurrently

# Volta para a raiz do projeto
cd ..

# Início do backend e frontend
echo "Iniciando o backend e o frontend..."
npm start
