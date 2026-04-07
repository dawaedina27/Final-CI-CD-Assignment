# Greeting App

[![CI Pipeline](https://github.com/dawaedina27/Final-CI-CD-Assignment/actions/workflows/ci-cd.yaml/badge.svg?branch=master)](https://github.com/dawaedina27/Final-CI-CD-Assignment/actions/workflows/ci-cd.yaml?query=branch%3Amaster)
[![Docker Image](https://img.shields.io/docker/v/dawaedina27/greeting-app?label=docker%20image)](https://hub.docker.com/r/dawaedina27/greeting-app)

Personalized greeting app built with Express, featuring a polished UI, flexible greeting options, and CI/CD via GitHub Actions with Docker image publishing.

## Features

- Personalized greetings with tone, language, time-of-day, and emoji options
- Quick actions: greet, surprise name, and clear
- Recent greeting history saved locally
- Clean, modern UI and responsive layout

## Run Locally

```bash
npm install
npm start
```

Open:

`http://localhost:4000/`

## API

`GET /api/greet`

Query parameters:

- `name` (string, default: `Guest`)
- `tone` (string: `friendly`, `professional`, `playful`, `grateful`)
- `language` (string: `en`, `es`, `fr`, `sw`, `de`)
- `time` (`1` or `true` to use time-of-day greeting)
- `emoji` (`1` or `true` to add an emoji)

Examples:

`http://localhost:4000/api/greet?name=Dawa`

`http://localhost:4000/api/greet?name=Dawa&tone=playful&language=sw&time=1&emoji=1`

Sample response:

```json
{
  "message": "Hello, Dawa! Great to see you! 👋",
  "meta": {
    "timeKey": "morning",
    "tone": "friendly",
    "language": "en"
  }
}
```

`GET /health`

Health response:

```json
{
  "status": "ok"
}
```

## Scripts

```bash
npm test
npm run test:ci
npm run lint
```

## Project Structure

- `public/` static UI assets (HTML/CSS)
- `app.js` Express app and API routes
- `main.js` server entry point
- `test/` API tests

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

## CI/CD

This project uses GitHub Actions to run tests and linting on every push, and to publish the Docker image when the pipeline succeeds.

## Security

- HTTP security headers via `helmet`
- Basic rate limiting on `/api/greet`

## Contributing

- Create a feature branch
- Run `npm test` and `npm run lint` before opening a PR

## License

MIT


