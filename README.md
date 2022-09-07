
# Nest.Js API 

Uma API básica em Nest.JS com consultas e atualizações do banco de dados em MySQL.




## Instalação

Instalação do MySQL
```
docker run --name mysql-desafio -p 3306:3306 -e MARIADB_ROOT_PASSWORD=desafio -d mariadb:latest
```

Dentro do arquivo ```app.module.ts```, inserir as variaveis de conexão com banco de dados.
Conexão padrão:
```
host: 192.168.0.16 (Mudar para seu IP)
database: desafio (Criar banco de dados 'desafio')
user: root
password: desafio
```

Para mudar a conexão do SMTP de envio de E-mail, inserir as variaveis user e pass no arquivo ```auth.service.ts```
na função ```forget```

leia sobre como utilizar o NodeMailer em https://community.nodemailer.com/using-gmail


Instalação com docker

```bash
  docker build -t nest-api-desafio .
  docker run -p 3333:3333 nest-api-desafio
```
Instalação com npm

```bash
  npm install
  npm run build
  npm start
```
A URL de acesso será http://localhost:3333


## Documentação da API
Todas as requisições, exceto: Login, Forget. é necessário haver autenticação.

## Auth
#### Fazer Login na API

```http
  POST /auth/login
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `email` | `string` | **Obrigatório**. E-mail cadastrado|
| `senha` | `string` | **Obrigatório**. Senha cadastrada|

#### Retorna as informações da conta

```http
  GET /auth/me
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `Authorization`      | `Bearer` | **Obrigatório**. Chave de autenticação JWT |

## Forget
#### Recuperar senha (Etapa 1: Enviar solicitação para o e-mail)

```http
  POST /auth/forget
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `email`      | `string` | **Obrigatório**. E-mail cadastrado|

#### Recuperar senha (Etapa 2: Inserir código recebido no e-mail)

```http
  POST /auth/forget/step
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `code`      | `string` | **Obrigatório**. Código recebido no E-mail|

#### Recuperar senha (Etapa 3: Inserir nova senha)

```http
  POST /auth/forget/reset
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `code`      | `string` | **Obrigatório**. Código recebido no E-mail|
| `password`      | `string` | **Obrigatório**. Nova senha|


## Usuarios
#### Retorna todos os usuarios

```http
  GET /users
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `Authorization` | `Bearer` | **Obrigatório**. Chave de autenticação JWT |

#### Retorna todos os usuarios colaboradores

```http
  GET /users/colaboradores
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `Authorization` | `Bearer` | **Obrigatório**. Chave de autenticação JWT |

#### Retorna um usuario

```http
  GET /users/{id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `Authorization`      | `Bearer` | **Obrigatório**. Chave de autenticação JWT |
| `id`      | `number` | **Obrigatório**. O ID do Usuario|

#### Cria um usuario

```http
  POST /users
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `Authorization`      | `Bearer` | **Obrigatório**. Chave de autenticação JWT |
| `nome`      | `string` | **Obrigatório**. O Nome do Usuario|
| `email`      | `string` | **Obrigatório**. O E-mail do Usuario|
| `senha`      | `string` | **Obrigatório**. Esta senha será criptografada em Bcrypt|
| `acesso`      | `number` | **Obrigatório**. 1 - Colaborador ou 2 - Gestor|

#### Atualiza um usuario

```http
  PUT /users/{id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `Authorization`      | `Bearer` | **Obrigatório**. Chave de autenticação JWT |
| `id`      | `number` | **Obrigatório**. O ID do Usuario|
| `nome`      | `string` | **Opcional**. O Nome do Usuario|
| `email`      | `string` | **Opcional**. O E-mail do Usuario|
| `senha`      | `string` | **Opcional**. Esta senha será criptografada em Bcrypt|
| `acesso`      | `number` | **Opcional**. 1 - Colaborador ou 2 - Gestor|

#### Deleta um usuario

```http
  DEL /users/{id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `Authorization`      | `Bearer` | **Obrigatório**. Chave de autenticação JWT |
| `id`      | `number` | **Obrigatório**. O ID do Usuario|

## Tasks
#### Retorna todas as Ordens de serviço

```http
  GET /tasks
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `Authorization` | `Bearer` | **Obrigatório**. Chave de autenticação JWT |

#### Retorna uma contagem de Ordens de serviço por Dia no mês para o Chart

```http
  GET /tasks/chart
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `Authorization` | `Bearer` | **Obrigatório**. Chave de autenticação JWT |

#### Retorna todas as Ordens de serviço completas

```http
  GET /tasks/chart
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `Authorization` | `Bearer` | **Obrigatório**. Chave de autenticação JWT |


#### Retorna uma Ordem de serviço

```http
  GET /tasks/{id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `Authorization`      | `Bearer` | **Obrigatório**. Chave de autenticação JWT |
| `id`      | `number` | **Obrigatório**. O ID da Ordem de serviço|

#### Cria uma Ordem de serviço

```http
  POST /tasks
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `Authorization`      | `Bearer` | **Obrigatório**. Chave de autenticação JWT |
| `client`      | `number` | **Obrigatório**. O ID do Cliente|
| `colaborador`      | `number` | **Obrigatório**. O ID do Colaborador|
| `description`      | `string` | **Obrigatório**. Descrição do problema|

#### Atualiza uma Ordem de serviço

```http
  PUT /tasks/{id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `Authorization`      | `Bearer` | **Obrigatório**. Chave de autenticação JWT |
| `id`      | `number` | **Obrigatório**. O ID da Ordem de serviço|
| `solution`      | `string` | **Opcional**. Solução do problema|
| `completed`      | `string` | **Obrigatório**. o valor precisa ser ```true```|

#### Deleta uma Ordem de  serviço

```http
  DEL /tasks/{id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `Authorization`      | `Bearer` | **Obrigatório**. Chave de autenticação JWT |
| `id`      | `number` | **Obrigatório**. O ID da Ordem de serviço|

## Clientes
#### Retorna todos os Clientes

```http
  GET /clients
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `Authorization` | `Bearer` | **Obrigatório**. Chave de autenticação JWT |

#### Retorna um Cliente

```http
  GET /clients/{id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `Authorization`      | `Bearer` | **Obrigatório**. Chave de autenticação JWT |
| `id`      | `number` | **Obrigatório**. O ID do Cliente|

#### Cria um Cliente

```http
  POST /clients
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `Authorization`      | `Bearer` | **Obrigatório**. Chave de autenticação JWT |
| `nome`      | `string` | **Obrigatório**. O nome do Cliente|


#### Atualiza um Cliente

```http
  PUT /clients/{id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `Authorization`      | `Bearer` | **Obrigatório**. Chave de autenticação JWT |
| `id`      | `number` | **Obrigatório**. O ID do Cliente|
| `nome`      | `string` | **Obrigatório**. Novo nome do Cliente|

#### Deleta um Cliente

```http
  DEL /clients/{id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `Authorization`      | `Bearer` | **Obrigatório**. Chave de autenticação JWT |
| `id`      | `number` | **Obrigatório**. O ID do Cliente|


## Aprendizados

Recebi a instrução de fazer o Projeto de Seleção da MonteNegro Hub no dia 03/09/2022
e a data de entrega até o dia 08/09/2022, as linguagens eram 
Next.Js (Front), Nest.Js(Back), MySQL (database), Docker. Com muito esforço e dedicação consegui terminar esta API em Nest.Js com funcionalidades básicas e autenticação JWT. Absorvi muito conhecimento das linguagens recente e tenho em mente utilizadas em todos os projetos apartir de então. 
