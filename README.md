- [qu1ck-technical-test](#qu1ck-technical-test)
  - [Getting Started](#getting-started)
    - [Docker](#docker)
      - [Migrations](#migrations)
    - [Node](#node)
  - [Documentation](#documentation)

[Português Brasil](./README-pt_br.md)

# qu1ck-technical-test

Project for the qu1ck selection process.

Creation of a workflow with a chatbot for a pizzeria, featuring a chatbot that uses artificial intelligence to respond to users.

Includes an inventory, order management system, and notifications in case any inventory item is running low.

## Getting Started

### Docker

```
docker-compose=>2.24.6
docker=>24.0.7
```

Copy the .env file and fill in the required information.

```bash
cp .env_example ./qu1ck-technical-test/.env
```

Build the project.

```bash
docker compose build
```

Start the container.

```bash
docker compose up -d
```

#### Migrations

Should only be run during the first container execution.

Access the web container using `sh`.

```bash
docker container exec -it qu1ck-technical-test-web-1 sh
```

Run the migrations.

```bash
npm run migration:run
```

Exit the container.

```bash
exit
```

---

Your application is available at `localhost:8080`.

### Node

Navigate to the project directory.

```bash
cd qu1ck-technical-test
```

Copy the .env file and fill in the required information.

```bash
cp .env_example ./qu1ck-technical-test/.env
```

Install the dependencies.

```bash
npm install
```

Run migrations

```bash
npm run migration:run
```

Build the project.

```bash
npm run build
```

Start the server.

```bash
npm run start
```

The default server address is `localhost:8080`.

## Documentation

[Click here to access the API documentation](./docs/README-pt_br.md).