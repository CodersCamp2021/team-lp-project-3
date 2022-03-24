# CodersCamp 2021 - Team: Łukasz Powązka

## Project 3: Node.js

**Mentor**: [Łukasz Powązka](https://github.com/lukiq)

**Team members**:

- [Patryk Brodziak](https://github.com/patrykbrodziak1)
- [Jakub Czerwiński](https://github.com/kubaczerwinski77)
- [Huber Grobelny](https://github.com/Burbinox)
- [Maciej Jankowski](https://github.com/macjank)
- [Krzysztof Prońko](https://github.com/Ruud1990)
- [Paweł Stępień](https://github.com/pastepi)

# API usage

## Introduction

Welcome to our API documentation. Here you can find all endpoints we provide, described in detail so that you can quickly and easily find what you need.

## HTTP status codes summary

- `400` - your request is incorrect, probably you have passed inproper argument. Check them out and try again.
- `404` - not found, you are trying to reach resource that does not exist.
- `500` - internal server error, let us know, we are probably already working on it.

## Deploy

We have deployed our API using Heroku platform and it is available at http://54.90.71.105:3000/. _Make sure you are using correct endpoints._

## Data

To access some data you need to be logged in. After registeration and each login, the user gets created session ID _(stored in cookies)_ that is maintained for 1 day.

## Docs

Here you can find all necessary things you need to now before using our API. Check out:

- [**User**](docs/user.md)
- [**Game**](docs/game.md)
- [**Rating**](docs/rating.md)
