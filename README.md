# DDD Forum API

Projeto de estudo desenvolvido durante o curso **Node.js** da [Rocketseat](https://rocketseat.com.br), com foco na aplicação dos princípios de **Domain-Driven Design (DDD)** em uma API de fórum.

## Sobre o projeto

A aplicação modela o domínio de um fórum onde alunos podem criar perguntas, responder questões e interagir com instrutores. O objetivo principal é explorar conceitos de DDD como:

- **Entidades** e **Value Objects**
- **Casos de uso** (Use Cases) isolados da camada de infraestrutura
- **Repositórios** com interfaces desacopladas
- **Agregados** e identidade de entidades com `UniqueEntityID`
- Separação entre camadas **enterprise** (domínio) e **application**

## Estrutura

```
src/
├── core/
│   └── entities/
│       ├── entity.ts               # Classe base para entidades
│       ├── unique-entity-id.ts     # Identificador único de entidade
│       └── types/
│           └── optional.ts
└── domain/
    └── forum/
        ├── application/
        │   ├── repositories/       # Interfaces dos repositórios
        │   └── use-cases/          # Casos de uso (com testes)
        └── enterprise/
            └── entities/           # Entidades e Value Objects do domínio
```

## Tecnologias

- **TypeScript**
- **Vitest** — testes unitários
- **Faker.js** — geração de dados para testes
- **Biome** — linting e formatação
- **Day.js** — manipulação de datas

## Como executar os testes

```bash
npm install
npm test
```

Para modo watch:

```bash
npm run test:watch
```
