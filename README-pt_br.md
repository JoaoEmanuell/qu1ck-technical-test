- [qu1ck-technical-test](#qu1ck-technical-test)
  - [Começando](#começando)
    - [Docker](#docker)
      - [Migrations](#migrations)
    - [Node](#node)
  - [Documentação](#documentação)


# qu1ck-technical-test

Projeto para o processo seletivo da qu1ck.

Criação de um workflow com chat bot para uma pizzaria, na qual possui um chat bot que utiliza inteligência artificial para responder os usuários.

Possuindo um sistema de gerenciamento de estoque, pedidos e notificações caso algum item do estoque esteja se esgotando.

## Começando

### Docker

```
docker-compose=>2.24.6
docker=>24.0.7
```

Copie o .env e preencha as informações dele

```bash
cp .env_example ./qu1ck-technical-test/.env
```

Faça a build do projeto

```bash
docker compose build
```

Suba o container

```bash
docker compose up -d
```

#### Migrations

Só deve ser realizadas na primeira execução do container

Acesse o container web usando `sh`

```bash
docker container exec -it qu1ck-technical-test-web-1 sh
```

Execute as migrations

```bash
npm run migration:run
```

Saia do container

```bash
exit
```

---

Seu aplicativo está disponível em `localhost:8080`

### Node

Acesse o diretório do projeto.

```bash
cd qu1ck-technical-test
```

Copie o .env e preencha as informações dele

```bash
cp ../.env_example .env
```

Instale as dependências

```bash
npm install
```

Execute o prisma generate

```bash
npm run prisma:generate
```

Execute as migrações

```bash
npm run migration:run
```

Faça a build

```bash
npm run build
```

Inicie o servidor

```bash
npm run start
```

O endereço padrão do servidor é `localhost:8080`

## Documentação

[Clique aqui para acessar a documentação da API](./docs/README-pt_br.md)