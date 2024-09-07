- [qu1ck-technical-test](#qu1ck-technical-test)
  - [Getting Started](#getting-started)
  - [Documentation](#documentation)

[Português Brasil](./README-pt_br.md)

# qu1ck-technical-test

Project for the qu1ck selection process.

Creation of a workflow with a chatbot for a pizzeria, featuring a chatbot that uses artificial intelligence to respond to users.

Includes a management system for inventory, orders, and notifications in case any inventory item is running low.

## Getting Started

Navigate to the project directory.

```bash
cd qu1ck-technical-test
```

Copy the .env file and fill in the required information.

```bash
cp .env_example .env
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

[Click here for access the api docs](./docs/README.md)