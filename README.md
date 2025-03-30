# API de Viagens

API de gerenciamento de lugares para viagens desenvolvida com NestJS, TypeScript e MySQL.

## Índice

- [Visão Geral](#visão-geral)
- [Tecnologias](#tecnologias)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Instalação e Configuração](#instalação-e-configuração)
- [Executando a Aplicação](#executando-a-aplicação)
- [Endpoints da API](#endpoints-da-api)
- [Modelo de Dados](#modelo-de-dados)
- [Ambiente de Desenvolvimento](#ambiente-de-desenvolvimento)
- [Variáveis de Ambiente](#variáveis-de-ambiente)

## Visão Geral

Esta API permite gerenciar destinos de viagem, armazenando informações sobre países, localizações e objetivos de viagem. A aplicação utiliza uma arquitetura modular baseada em NestJS com TypeORM para persistência de dados em um banco MySQL.

## Tecnologias

- **Backend:**
  - NestJS
  - TypeScript
  - TypeORM
  - MySQL 8.0
  - Docker & Docker Compose
  - Class Validator

## Estrutura do Projeto

```
├── src/
│   ├── main.ts                  # Ponto de entrada da aplicação
│   ├── app.module.ts            # Módulo principal da aplicação
│   └── modules/
│       └── places/              # Módulo de lugares
│           ├── dto/             # Objetos de transferência de dados
│           ├── entities/        # Entidades do banco de dados
│           ├── places.controller.ts  # Controlador de rotas
│           ├── places.module.ts      # Definição do módulo
│           └── places.service.ts     # Lógica de negócios
├── docker-compose.yml           # Configuração do Docker Compose
└── .env                         # Variáveis de ambiente
```

## Instalação e Configuração

### Pré-requisitos

- Docker e Docker Compose
- Node.js (para desenvolvimento local)
- npm ou yarn

### Clonando o Repositório

```bash
git clone https://github.com/JoseJaan/API-NestJS
cd API-NestJS
```

## Executando a Aplicação

### Com Docker Compose

Para iniciar a aplicação e o banco de dados MySQL:

```bash
docker-compose up
```

A API estará disponível em `http://localhost:3000/api`.

## Endpoints da API

### Places 

| Método | Endpoint     | Descrição                             |
|--------|--------------|---------------------------------------|
| GET    | /api/places  | Listar todos os lugares               |
| POST   | /api/places  | Criar um novo lugar                   |
| PATCH  | /api/places/:id | Atualizar um lugar existente       |
| DELETE | /api/places/:id | Excluir um lugar                   |

### Requisições e Respostas

#### Listar Todos os Lugares

**Requisição**:
```
GET /api/places
```

**Resposta**:
```json
[
  {
    "id": 1,
    "country": "Brasil",
    "location": "Rio de Janeiro",
    "goal": "12/27",
    "flagUrl": "https://exemplo.com/bandeira-brasil.png",
    "createdAt": "2025-03-30T10:00:00.000Z",
    "updatedAt": "2025-03-30T10:00:00.000Z"
  },
  {
    "id": 2,
    "country": "Itália",
    "location": "Roma",
    "goal": "02/28",
    "flagUrl": "https://exemplo.com/bandeira-italia.png",
    "createdAt": "2025-03-30T10:15:00.000Z",
    "updatedAt": "2025-03-30T10:15:00.000Z"
  }
]
```

#### Criar um Novo Lugar

**Requisição**:
```
POST /api/places
Content-Type: application/json

{
  "country": "França",
  "location": "Paris",
  "goal": "09/25",
  "flagUrl": "https://exemplo.com/bandeira-franca.png"
}
```

**Resposta**:
```json
{
  "id": 3,
  "country": "França",
  "location": "Paris",
  "goal": "09/25",
  "flagUrl": "https://exemplo.com/bandeira-franca.png",
  "createdAt": "2025-03-30T10:30:00.000Z",
  "updatedAt": "2025-03-30T10:30:00.000Z"
}
```

#### Atualizar um Lugar

**Requisição**:
```
PATCH /api/places/3
Content-Type: application/json

{
  "location": "Lyon",
  "goal": "07/25"
}
```

**Resposta**:
```json
{
  "id": 3,
  "country": "França",
  "location": "Lyon",
  "goal": "07/25",
  "flagUrl": "https://exemplo.com/bandeira-franca.png",
  "createdAt": "2025-03-30T10:30:00.000Z",
  "updatedAt": "2025-03-30T10:45:00.000Z"
}
```

#### Excluir um Lugar

**Requisição**:
```
DELETE /api/places/3
```

**Resposta**:
```json
{
  "message": "Place deleted successfully"
}
```

## Modelo de Dados

### Place (Lugar)

| Campo       | Tipo     | Descrição                            |
|-------------|----------|--------------------------------------|
| id          | number   | Identificador único (chave primária) |
| country     | string   | Nome do país                         |
| location    | string   | Nome da localização/cidade           |
| goal        | string   | Objetivo da viagem                   |
| flagUrl     | string   | URL da bandeira do país              |
| createdAt   | Date     | Data de criação do registro          |
| updatedAt   | Date     | Data da última atualização           |

## Ambiente de Desenvolvimento

A aplicação está configurada com:

- CORS habilitado para `http://localhost:3001` (porta do frontend)
- Prefixo global `/api` para todas as rotas
- Sincronização automática do esquema do banco de dados (`synchronize: true`)
- Carregamento automático de entidades (`autoLoadEntities: true`)

## Variáveis de Ambiente

| Variável  | Descrição                   | Valor Padrão   |
|-----------|----------------------------|---------------|
| DB_USER   | Usuário do banco de dados  | root          |
| DB_PASS   | Senha do banco de dados    | positivo123   |
| DB_NAME   | Nome do banco de dados     | APIDIWO       |
| DB_HOST   | Host do banco de dados     | db            |
| DB_PORT   | Porta do banco de dados    | 3306          |

**Nota**: Para ambiente de produção, recomenda-se alterar as credenciais padrão do banco de dados por motivos de segurança.# API de Viagens

API de gerenciamento de lugares para viagens desenvolvida com NestJS, TypeScript e MySQL.

## Índice

- [Visão Geral](#visão-geral)
- [Tecnologias](#tecnologias)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Instalação e Configuração](#instalação-e-configuração)
- [Executando a Aplicação](#executando-a-aplicação)
- [Endpoints da API](#endpoints-da-api)
- [Modelo de Dados](#modelo-de-dados)
- [Ambiente de Desenvolvimento](#ambiente-de-desenvolvimento)
- [Variáveis de Ambiente](#variáveis-de-ambiente)

## Visão Geral

Esta API permite gerenciar destinos de viagem, armazenando informações sobre países, localizações e objetivos de viagem. A aplicação utiliza uma arquitetura modular baseada em NestJS com TypeORM para persistência de dados em um banco MySQL.

## Tecnologias

- **Backend:**
  - NestJS
  - TypeScript
  - TypeORM
  - MySQL 8.0
  - Docker & Docker Compose
  - Class Validator

## Estrutura do Projeto

```
├── src/
│   ├── main.ts                  # Ponto de entrada da aplicação
│   ├── app.module.ts            # Módulo principal da aplicação
│   └── modules/
│       └── places/              # Módulo de lugares
│           ├── dto/             # Objetos de transferência de dados
│           ├── entities/        # Entidades do banco de dados
│           ├── places.controller.ts  # Controlador de rotas
│           ├── places.module.ts      # Definição do módulo
│           └── places.service.ts     # Lógica de negócios
├── docker-compose.yml           # Configuração do Docker Compose
└── .env                         # Variáveis de ambiente
```

## Instalação e Configuração

### Pré-requisitos

- Docker e Docker Compose
- Node.js (para desenvolvimento local)
- npm ou yarn

### Clonando o Repositório

```bash
git clone [URL_DO_REPOSITÓRIO]
cd [NOME_DO_DIRETÓRIO]
```

### Configurando as Variáveis de Ambiente

O arquivo `.env` já contém as configurações necessárias para desenvolvimento:

```
DB_USER=root
DB_PASS=positivo123
DB_NAME=APIDIWO
DB_HOST=db
DB_PORT=3306
```

## Executando a Aplicação

### Com Docker Compose

Para iniciar a aplicação e o banco de dados MySQL:

```bash
docker-compose up
```

Para executar em segundo plano:

```bash
docker-compose up -d
```

A API estará disponível em `http://localhost:3000/api`.

### Para Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Iniciar em modo de desenvolvimento
npm run start:dev
```

## Endpoints da API

### Places (Lugares)

| Método | Endpoint     | Descrição                             |
|--------|--------------|---------------------------------------|
| GET    | /api/places  | Listar todos os lugares               |
| POST   | /api/places  | Criar um novo lugar                   |
| PATCH  | /api/places/:id | Atualizar um lugar existente       |
| DELETE | /api/places/:id | Excluir um lugar                   |

### Requisições e Respostas

#### Listar Todos os Lugares

**Requisição**:
```
GET /api/places
```

**Resposta**:
```json
[
  {
    "id": 1,
    "country": "Brasil",
    "location": "Rio de Janeiro",
    "goal": "Visitar o Cristo Redentor",
    "flagUrl": "https://exemplo.com/bandeira-brasil.png",
    "createdAt": "2025-03-30T10:00:00.000Z",
    "updatedAt": "2025-03-30T10:00:00.000Z"
  },
  {
    "id": 2,
    "country": "Itália",
    "location": "Roma",
    "goal": "Visitar o Coliseu",
    "flagUrl": "https://exemplo.com/bandeira-italia.png",
    "createdAt": "2025-03-30T10:15:00.000Z",
    "updatedAt": "2025-03-30T10:15:00.000Z"
  }
]
```

#### Criar um Novo Lugar

**Requisição**:
```
POST /api/places
Content-Type: application/json

{
  "country": "França",
  "location": "Paris",
  "goal": "Visitar a Torre Eiffel",
  "flagUrl": "https://exemplo.com/bandeira-franca.png"
}
```

**Resposta**:
```json
{
  "id": 3,
  "country": "França",
  "location": "Paris",
  "goal": "Visitar a Torre Eiffel",
  "flagUrl": "https://exemplo.com/bandeira-franca.png",
  "createdAt": "2025-03-30T10:30:00.000Z",
  "updatedAt": "2025-03-30T10:30:00.000Z"
}
```

#### Atualizar um Lugar

**Requisição**:
```
PATCH /api/places/3
Content-Type: application/json

{
  "goal": "Visitar a Torre Eiffel e o Museu do Louvre"
}
```

**Resposta**:
```json
{
  "id": 3,
  "country": "França",
  "location": "Paris",
  "goal": "Visitar a Torre Eiffel e o Museu do Louvre",
  "flagUrl": "https://exemplo.com/bandeira-franca.png",
  "createdAt": "2025-03-30T10:30:00.000Z",
  "updatedAt": "2025-03-30T10:45:00.000Z"
}
```

#### Excluir um Lugar

**Requisição**:
```
DELETE /api/places/3
```

**Resposta**:
```json
{
  "message": "Place deleted successfully"
}
```

## Modelo de Dados

### Place (Lugar)

| Campo       | Tipo     | Descrição                            |
|-------------|----------|--------------------------------------|
| id          | number   | Identificador único (chave primária) |
| country     | string   | Nome do país                         |
| location    | string   | Nome da localização/cidade           |
| goal        | string   | Objetivo da viagem                   |
| flagUrl     | string   | URL da bandeira do país              |
| createdAt   | Date     | Data de criação do registro          |
| updatedAt   | Date     | Data da última atualização           |

## Ambiente de Desenvolvimento

A aplicação está configurada com:

- CORS habilitado para `http://localhost:3001` (porta do frontend)
- Prefixo global `/api` para todas as rotas
- Sincronização automática do esquema do banco de dados (`synchronize: true`)
- Carregamento automático de entidades (`autoLoadEntities: true`)

## Variáveis de Ambiente

| Variável  | Descrição                   | Valor Padrão   |
|-----------|----------------------------|---------------|
| DB_USER   | Usuário do banco de dados  | -          |
| DB_PASS   | Senha do banco de dados    | -   |
| DB_NAME   | Nome do banco de dados     | -       |
| DB_HOST   | Host do banco de dados     | db            |
| DB_PORT   | Porta do banco de dados    | 3306          |
