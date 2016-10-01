## Poker planning cards
# Angular2 MEAN - QuickStart application with ExpressJS, MongoDB, Gulp and Typescript (Repository Pattern)

##Introduction

Basic Angular seed application created with Quick start application (Tour of Heroes) given on angular website. It uses ExpressJS along with Mongo DB support (Mongoose) via a wrapper of Repository Pattern as Business layer.
It also uses Gulp for running task and TsLint.The seed application is built over node and uses latest node packages.

## [https://angular2-express-mongoose.herokuapp.com/](https://angular2-express-mongoose.herokuapp.com/)

## Prerequisites

1. Latest version of Node to be installed.
2. Install MongoDB and make sure it is running on default port 27017 (if not then please configure constants.ts and change the connection for mongoDB).

## Steps to Run
```sh
    npm install          <= install all the npm Dependencies
    npm run build        <= build and compile the dest folder
    npm run deploy       <= start the Nodemon and watch for changes.
```

## Global packages
```
    npm install ts-node -g
    npm install typescript-node -g
    npm install nodemon -g
    npm install concurrently -g
    npm install gulp -g
```

## Directory Structure

```
angular2-MEAN
    ├── node_modules
    ├── client
    │    ├── app
    │    │    ├── Components
    │    │    │    ├── dashboard
    │    │    │    │    ├── dashboard.component.css
    │    │    │    │    ├── dashboard.component.html
    │    │    │    │    ├── dashboard.component.ts
    │    │    │    ├── heroDetail
    │    │    │    │    ├── hero-detail.component.css
    │    │    │    │    ├── hero-detail.component.html
    │    │    │    │    ├── hero-detail.component.ts    
    │    │    │    ├── heroes
    │    │    │    │    ├── heroes.component.css
    │    │    │    │    ├── heroes.component.html
    │    │    │    │    ├── heroes.component.ts    
    │    │    ├── models
    │    │    │    ├── hero.ts
    │    │    ├── services
    │    │    │    ├── hero.service.ts            <= Hero Service for fetching api
    │    │    ├── app.component.css
    │    │    ├── app.component.ts
    │    │    ├── app.html
    │    │    ├── app.module.ts
    │    │    ├── app.routing.ts
    │    │    ├── main.ts
    │    ├── typings
    │    ├── index.html
    │    │    ├── systemjs.config.js
    │    ├── tsconfig.json
    │    ├── typings.json
    ├── server
    │    ├── src
    │    │    ├── app
    │    │    │    ├── business                    <= business logic for application
    │    │    │    │    ├── common
    │    │    │    │    │    ├── Read.ts           <= common Read method
    │    │    │    │    │    ├── Write.ts          <= common Write method
    │    │    │    │    ├── interfaces
    │    │    │    │    │    ├── HeroBusiness.ts
    │    │    │    │    ├── BaseBusiness.ts
    │    │    │    │    ├── HeroBusiness.ts
    │    │    │    ├── dataAccess
    │    │    │    │    ├── schemas
    │    │    │    │    │    ├── HeroSchema.ts    <= Hero Schema for MongoDB
    │    │    │    │    ├── DataAccess.ts         <= Connection with MongoDB
    │    │    │    ├── model
    │    │    │    │    ├── interfaces
    │    │    │    │    │    ├── HeroModel.ts
    │    │    │    │    ├── HeroModel.ts
    │    │    │    ├── repository
    │    │    │    │    ├── interfaces
    │    │    │    │    │    ├── Read.ts
    │    │    │    │    │    ├── Write.ts
    │    │    │    │    ├── BaseRepository.ts
    │    │    │    │    ├── HeroRepository.ts
    │    │    ├── config
    │    │    │    ├── constants
    │    │    │    │    ├── constants.ts         <= Constants - mongodb connection string.
    │    │    │    ├── routes
    │    │    │    │    ├── HeroRoutes.ts        <= Hero API Routes like get,post,put,delete
    │    │    │    │    ├── Routes.ts            <= fetching all appliction routes here
    │    │    ├── controller
    │    │    │    ├── interfaces
    │    │    │    │    ├── ReadController.ts
    │    │    │    │    ├── WriteController.ts
    │    │    │    ├── BaseController.ts         <= Base Repository controller
    │    │    │    ├── HeroController.ts
    │    │    ├── server.ts
    │    ├── typings
    │    ├── tsconfig.json
    │    ├── tsconfig.json
    ├── gulpfile.ts                              <= gulp tasks : clean, build, compile, run.
    ├── LICENSE
    ├── package.json
    ├── README.md
    ├── tsconfig.json
    ├── tslint.json
    
```

## Features (Angular2, Express, Gulp, MongoDB, Node)

1.  Angular 2 Quick Start application (Tours of Hero) from https://angular.io/docs/ts/latest/quickstart.html
2.  Added support for Gulp so that js files are moved out of the app folder.
3.  It will create a dist folder where it will place all the js files.
4.  Gulp will monitor for the changes via help of watcher.
5.  Created folder structure for easy access of components, services and models.
6.  Applied tslint for avoiding any typos.
7.  Implemented best practices recomended on the Angular 2 website.
8.  Implemented Express Server to Host API's
9.  Added MongoDB support to communicate our Heroes data to Database
10. Implemented Repository Pattern to communicate with Mongoose.

## Api Document (from MongoDB)

```
1. getAll    http://localhost:3000/api/heroes             <= get all heroes
1. getById   http://localhost:3000/api/heroes/:id         <= get hero by Id
2. post      http://localhost:3000/api/heroes             <= create hero
2. put       http://localhost:3000/api/heroes/:id         <= update hero
2. delete    http://localhost:3000/api/heroes/:id         <= delete hero

```
## Dependencies

1. Angular 2
2. TypeScript
3. Gulp
4. ExpressJS
5. NodeJS
6. Nodemon
7. TsLint
8. MongoDB

## License

MIT
