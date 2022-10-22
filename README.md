<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).


## Backend-сервер для функционирования доски объявлений.

Функционал, который требуется реализовать:
1.	Регистрация и аутентификация пользователя в личном кабинете:
a.	пользователь при регистрации должен указать роль, email и пароль;
b.	аутентификацию реализовать через вход по email и паролю.
2.	В личном кабинете пользователь может создать объявление и разместить его на доске объявлений в общем списке. Объявление содержит название, описание, контакты продавца и изображения.
3.	Доска объявлений в данном случае - это список всех объявлений с многочисленными фильтрами (продумать максимально возможные варианты фильтров на своё усмотрение), который отображается на главной странице сервиса.
4.	Пользователь может как размещать свои объявления, так и совершать сделки в рамках других объявлений.
5.	Объявления имеют 2 статуса - активное и снятое с публикации.
6.	Продумать и реализовать вариант коммуникации между покупателем и продавцом во время совершения сделки.
7.	Для всех методов необходимо реализовать API-методы с документацией на Swagger.
8.	Покрыть весь функционал тестами. Желательно использовать TDD при разработке.

Дополнительные требования:
1.	Сделать обертку исходного кода в docker-образ (добавить в корневую директорию файл Dockerfile, docker-compose.yml при необходимости).
2.	В readme файл разместить текст данного задания, а, также, инструкцию по развертыванию проекта и основные команды для запуска.
3.	Исходный код выложить на github.com в публичный репозиторий.
4.	При создании коммитов писать осмысленные названия.
5.	Использовать инструмент тестового покрытия для отображения % покрытия исходного кода тестами.
6.	Для проверки кода дополнительно подключить линтер на выбор.

## How to run
Code on your laptop, database in container.

1. Create the docker.env file

```
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
PGADMIN_DEFAULT_EMAIL=
PGADMIN_DEFAULT_PASSWORD=
```
and .env file

```
POSTGRES_HOST=
POSTGRES_PORT=
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
PORT=
JWT_SECRET=
JWT_EXPIRATION_TIME=
```

2. Start container with database
```
docker-compose up
```
3. Run Nest application
```
npm run start:dev
```
