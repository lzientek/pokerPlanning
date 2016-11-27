## Poker planning cards [![Build Status](https://travis-ci.org/lzientek/pockerPlanning.svg?branch=master)](https://travis-ci.org/lzientek/pockerPlanning)
# Angular2 MEAN - QuickStart application with ExpressJS, MongoDB, Gulp and Typescript (Repository Pattern)

## Run services

#### Start

With `docker-compose`
```bash
docker-compose up -d
```

**Or**

```bash
docker build -t pokerplanning .
docker run -d --name mongo -p 27017:27017 mongo:3.4
docker run -d --name pokerplanning --link mongo:mongo -p 80:80 -e PORT="80" -e NODE_ENV="production" -e dbURI="mongodb://mongo:27017/pokerPlanning" pokerplanning
```

#### Remove

With `docker-compose`
```bash
docker-compose down
```

**Or**

Container
```bash
docker rm -f pokerplanning mongo
```
Images
```bash
docker rmi pokerplanning mongo:3.4
```
## Prerequisites

1. Latest version of Node to be installed. (6.9.*^)
2. Install MongoDB and make sure it is running on default port 27017 (if not then please configure constants.ts and change the connection for mongoDB). (3.2.*^)

## Steps to Run
```sh
    make install //run only once install npm package
    make build
    make run
```

## Global packages requierement
```
npm install typescript -g
npm install typings -g
npm install gulp -g


```
## Dependencies

1. Angular 2
2. TypeScript
3. Gulp
4. ExpressJS
5. NodeJS
6. TsLint
7. MongoDB
8. Sass
9. Bootstrap
