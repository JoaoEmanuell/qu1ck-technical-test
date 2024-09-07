- [Documentação da API](#documentação-da-api)
  - [Endpoint](#endpoint)
  - [Chat](#chat)
    - [Create](#create)
  - [Requests](#requests)
    - [Get all](#get-all)
    - [Create](#create-1)
    - [Get unique](#get-unique)
    - [Edit](#edit)
    - [Delete](#delete)
    - [Edit status](#edit-status)
  - [Manager](#manager)
    - [Notificações](#notificações)
      - [Get all](#get-all-1)
      - [Criação de notificação](#criação-de-notificação)
      - [Apagando todas as notificações](#apagando-todas-as-notificações)
      - [Apagando uma notificação](#apagando-uma-notificação)
    - [Estoque](#estoque)
      - [Get all](#get-all-2)
      - [Criação de item para o estoque](#criação-de-item-para-o-estoque)
      - [Editando vários itens do estoque](#editando-vários-itens-do-estoque)
      - [Editando um item do estoque](#editando-um-item-do-estoque)
      - [Deletando um item do estoque](#deletando-um-item-do-estoque)


# Documentação da API

## Endpoint

Toda a API é acessada através do:

```
localhost:8080/api
```

## Chat

Chat é a rota responsável pelo chatbot.

```
<endpoint>/chat
```

Métodos permitidos: **POST**

### Create

**POST**

Usado para enviar uma mensagem para a API. Ela coletará o estoque e sua mensagem e enviará para o container da *dify.ai*, que usará inteligência artificial para avaliar seu pedido.

**Corpo da requisição**:

```json
{
  "text": "string"
}
```

**Resposta ideal**:

**Status code 201**

```json
{ 
  "status": true, 
  "message_for_client": "Mensagem gerada pela IA, informando que o pedido pode ser realizado"
}
```

**Erro**:

**Status code 400**

```json
{
  "error_code": "INVALID_DATA",
  "error_description": "..."
}
```

## Requests

Requests é a rota responsável pelo registro dos pedidos.

```
<endpoint>/requests
```

Métodos permitidos: **POST** | **GET**

### Get all

**GET**

Retorna todos os pedidos cadastrados.

**Resposta**:

```json
[
  {
    "id": "number",
    "request_itens": "string",
    "date": "string", // no formato de string
    "status": "received" | "in_progress" | "completed" | "cancelled"
  },
  ...
]
```

### Create

**POST**

Usado para criar um novo pedido.

**Corpo da requisição**:

```json
{
  "request_itens": "string",
  "date": "string", // No formato de string
  "status": "received" | "in_progress" | "completed" | "cancelled"
}
```

**Resposta**:

```json
{
  "id": "number",
  "request_itens": "string", // criptografado
  "date": "string", // No formato de string
  "status": "received" | "in_progress" | "completed" | "cancelled"
}
```

**Erro**:

**Status code 400**

```json
{
  "error_code": "INVALID_DATA",
  "error_description": "..."
}
```

### Get unique

**GET**

**200** | **404**

```
<endpoint>/requests/{id}
```

Usado para coletar um único pedido.

**Resposta**:

```json
{
  "id": "number",
  "request_itens": "string",
  "date": "string", // No formato de string
  "status": "received" | "in_progress" | "completed" | "cancelled"
}
```

### Edit

**PUT**

**201** | **400**

```
<endpoint>/requests/{id}
```

Usado para editar um pedido.

**Corpo da requisição**:

```json
{
  "request_itens": "string", // opcional
  "date": "string" // No formato de string, opcional
}
```

**Resposta**:

```json
{
  "id": "number",
  "request_itens": "string", // criptografado
  "date": "string", // No formato de string
  "status": "received" | "in_progress" | "completed" | "cancelled"
}
```

**Erro**:

**Status code 400**

```json
{
  "error_code": "INVALID_DATA",
  "error_description": "..."
}
```

### Delete

**DELETE**

**200** | **400**

```
<endpoint>/requests/{id}
```

Usado para deletar um pedido.

**Resposta**:

```json
{
  "message": "Request deleted with success"
}
```

**Erro**:

**Status code 400**

```json
{
  "error_code": "INVALID_ID",
  "error_description": "Invalid ID"
}
```

### Edit status

**PUT**

**201** | **400**

```
<endpoint>/requests/{id}/{status}
```

Usado para editar o status de um pedido.

Status deve ser igual a 'received', 'in_progress', 'completed' ou 'cancelled'.

**Resposta (200)**:

```json
{
  "id": "number",
  "request_itens": "string", // criptografado
  "date": "string", // No formato de string
  "status": "received" | "in_progress" | "completed" | "cancelled"
}
```

**Erros**:

**Status code 400**

*Id inválido*:

```json
{
  "error_code": "INVALID_ID",
  "error_description": "Invalid ID"
}
```

*Status inválido*:

```json
{
  "error_code": "INVALID_STATUS",
  "error_description": "Invalid status"
}
```

## Manager

```
<endpoint>/manager/
```

Rota responsável pelas ações do gerente. Essa rota gerencia as notificações e o estoque.

### Notificações

```
<endpoint>/manager/notifications
```

Métodos permitidos: **GET** | **POST** | **PUT**

#### Get all

**GET**

Retorna todas as notificações.

**Resposta (200)**:

```json
[
  {
    "id": "number",
    "message": "string"
  },
  ...
]
```

#### Criação de notificação

**POST**

**Corpo**:

```json
{
  "message": "string"
}
```

**Resposta (201)**:

```json
{
  "id": "number",
  "message": "string" // criptografado
}
```

**Erro**:

**Status code 400**

```json
{
  "error_code": "INVALID_DATA",
  "error_description": "..."
}
```

#### Apagando todas as notificações

**PUT**

Apaga todas as notificações.

**Corpo**:

```json
{
  "notifications": [
    {
      "id": "number",
      "message": "string"
    }
  ]
}
```

**Resposta (200)**:

```json
{
  "message": "Notifications deleted with success"
}
```

#### Apagando uma notificação

**DELETE**

```
<endpoint>/manager/notifications/{id}
```

**Resposta (200)**:

```json
{
  "message": "Notification deleted with success"
}
```

**Erro**:

**Status code 400**

Caso o id seja inválido:

```json
{
  "error_code": "INVALID_ID",
  "error_description": "Invalid ID"
}
```

**Status code 404**

Caso a notificação não seja encontrada:

```json
{
  "error_code": "NOTIFICATION_NOT_FOUND",
  "error_description": "notification not found"
}
```

### Estoque

```
<endpoint>/manager/stock
```

Métodos permitidos: **GET** | **POST** | **PUT**

#### Get all

**GET**

Retorna todo o estoque.

**Resposta (200)**:

```json
[
  {
    "id": "number",
    "ingredient_name": "string",
    "quantity": "number",
    "unit_of_measurement": "gram" | "milliliter" | "unit"
  },
  ...
]
```

#### Criação de item para o estoque

**POST**

**Corpo**:

```json
{
  "ingredient_name": "string",
  "quantity": "number",
  "unit_of_measurement": "gram" | "milliliter" | "unit"
}
```

**Resposta (201)**:

```json
{
  "id": "number",
  "ingredient_name": "string", // criptografado
  "quantity": "number",
  "unit_of_measurement": "gram" | "milliliter" | "unit"
}
```

**Erro**:

**Status code 400**

```json
{
  "error_code": "INVALID_DATA",
  "error_description": "..."
}
```

#### Editando vários itens do estoque

**PUT**

**Corpo**:

```json
{
  "data": [
    {
      "id": "number",
      "ingredient_name": "string",
      "quantity": "number",
      "unit_of_measurement": "gram" | "milliliter" | "unit"
    }
  ]
}
```

**Resposta (201)**:

```json
{
  "message": "Items edited with success"
}
```

#### Editando um item do estoque

**PUT**

```
<endpoint>/manager/stock/{id}
```

**Corpo**:

```json
{
  "ingredient_name": "string", // opcional
  "quantity": "number", // opcional
  "unit_of_measurement": "gram" |

 "milliliter" | "unit" // opcional
}
```

**Resposta (201)**:

```json
{
  "ingredient_name": "string", // criptografado
  "quantity": "number",
  "unit_of_measurement": "gram" | "milliliter" | "unit"
}
```

**Erro**:

**Status code 400**

```json
{
  "error_code": "INVALID_DATA",
  "error_description": "..."
}
```

#### Deletando um item do estoque

**DELETE**

```
<endpoint>/manager/stock/{id}
```

**Resposta (200)**:

```json
{
  "message": "Item deleted with success"
}
```

**Erro**:

**Status code 400**

Caso o id seja inválido:

```json
{
  "error_code": "INVALID_ID",
  "error_description": "Invalid ID"
}
```

**Status code 404**

Caso o item não seja encontrado:

```json
{ 
    "message": "stock not found" 
}
```