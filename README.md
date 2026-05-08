# Species API

API REST desenvolvida em Node.js com TypeScript para gerenciamento de espécies, autenticação JWT, integração com API externa de clima e estatísticas por categoria.

---

# Tecnologias Utilizadas

* Node.js
* TypeScript
* Express
* Prisma ORM
* PostgreSQL
* JWT
* Bcrypt
* Open-Meteo API

---

# Funcionalidades

## Autenticação

* Registro de usuários
* Login com JWT
* Middleware de autenticação

## Espécies

* Cadastro de espécies
* Listagem de espécies
* Busca por nome comum ou científico
* Filtro por categoria
* Estatísticas agrupadas por categoria

## Integração Externa

* Consulta automática de clima utilizando Open-Meteo API
* Armazenamento de dados climáticos em `externalData`

---

# Estrutura do Projeto

```bash
src/
 ├── controllers/
 ├── middleware/
 ├── routes/
 ├── services/
 │    └── external/
 ├── prisma/
 ├── app.ts
 └── server.ts
```

---

# Como Rodar o Projeto

## 1. Clonar o repositório

```bash
git clone <URL_DO_REPOSITORIO>
```

---

## 2. Entrar na pasta do projeto

```bash
cd especies-api
```

---

## 3. Instalar dependências

```bash
npm install
```

---

## 4. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="postgresql://postgres:SUA_SENHA@localhost:5433/especies_db"
JWT_SECRET="sua_chave_secreta"
```

---

## 5. Rodar migrations do Prisma

```bash
npx prisma migrate dev
```

---

## 6. Gerar Prisma Client

```bash
npx prisma generate
```

---

## 7. Iniciar servidor

```bash
npm run dev
```

Servidor disponível em:

```bash
http://localhost:3000
```

---

# Endpoints

## Auth

### Registro

```http
POST /auth/register
```

Body:

```json
{
  "email": "user@email.com",
  "password": "123456"
}
```

---

### Login

```http
POST /auth/login
```

Body:

```json
{
  "email": "user@email.com",
  "password": "123456"
}
```

---

# Species

## Criar espécie

```http
POST /species
```

Headers:

```http
Authorization: Bearer TOKEN
```

Body:

```json
{
  "commonName": "Lobo-Guará",
  "scientificName": "Chrysocyon brachyurus",
  "category": "mamifero",
  "latitude": -15.7801,
  "longitude": -47.9292
}
```

---

## Listar espécies

```http
GET /species
```

---

## Buscar espécies

### Buscar por nome comum ou científico

```http
GET /species?search=lobo
```

---

### Filtrar por categoria

```http
GET /species?category=mamifero
```

---

### Combinar filtros

```http
GET /species?search=arara&category=ave
```

---

## Estatísticas por categoria

```http
GET /species/stats/by-category
```

Exemplo de resposta:

```json
[
  {
    "category": "mamifero",
    "count": 2,
    "species": [
      {
        "commonName": "Lobo-Guará",
        "scientificName": "Chrysocyon brachyurus"
      }
    ]
  }
]
```

---

# Integração com API Externa

A API utiliza a Open-Meteo API para buscar dados climáticos com base na latitude e longitude informadas durante o cadastro da espécie.

Os dados retornados são armazenados no campo `externalData`.

---

# Scripts

## Rodar aplicação em desenvolvimento

```bash
npm run dev
```

---

## Rodar Prisma Studio

```bash
npx prisma studio
```

---

## Gerar Prisma Client

```bash
npx prisma generate
```

---

# Autor

Vicente Nascimento

