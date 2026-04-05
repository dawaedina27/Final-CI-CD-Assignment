# Greeting App

Simple Express app with CI/CD via GitHub Actions and Docker image publishing.

## Run Locally

```bash
npm install
npm start
```

Open:

`http://localhost:4000/`

## API

`GET /api/greet?name=YourName`

Example:

`http://localhost:4000/api/greet?name=Alex`

## Docker (Local Build)

```bash
docker build -t greeting-app .
docker run -p 4000:4000 greeting-app
```

## Docker (Pull From Hub)

```bash
docker pull dawaedina27/greeting-app:latest
docker run -p 4000:4000 dawaedina27/greeting-app:latest
```
