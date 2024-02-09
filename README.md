# Drones API

## Description

This is a demo project based on [Nest](https://github.com/nestjs/nest) framework to handle Drone delivery business logic.

## Requirements:

- Node.JS (20.11.0 LTS or later).
- TypeScript
- PostgreSQL
- Docker and Docker Compose (optional).

## Setup and Running

First of all, you need to set up your environment variables, whether you are going to run the project locally or over Docker. You can find a sample of environment variable in the file:
`template.env`

Copy it as an env file:

```bash
cp template.env .env
```

Also, you might need these vars exported for Docker, for example (you can change the assigned values as it suits you):

```bash
export PORT=3000
export DATABASE_HOST=0.0.0.0
export DATABASE_PORT=5432
export DATABASE_USERNAME=postgres
export DATABASE_PASSWORD=postgres
export DATABASE_NAME=postgres
```

### Running with Docker Compose

Probably the fastest way to run the app in dev mode. Make sure you have [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/get-started/08_using_compose/) installed correctly on your machine. Then run from the terminal

```bash
docker compose up --build
```

You will have the API running and listening on PORT value (3000 by default), and preloaded with data.

### Running Locally

- You need PostgreSQL server up and running with username/password/db name as mentioned above in the env vars. You can save up some time and run PostgreSQL in a Docker container (All commands above from the terminal shell):

```bash
docker run -d -p 5432:5432 --name drone-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=postgres -e POSTGRES_USER=postgres -e PGDATA=/var/lib/postgresql/data/pgdata -v /tmp/pgdata:/var/lib/postgresql/data postgres
```

- Then install dependencies:

```bash
npm install
```

- Then build the project to be ready for DB migrations:

```bash
npm run build
```

- Preload DB with Data:

```bash
npm run migration:run
```

### Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

Check if the API service is running:

```
localhost:3000
```
and you should get a reply: `'Drone API is up and running!'`;

## Tests

@TODO: adding tests.