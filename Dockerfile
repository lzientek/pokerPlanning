FROM node:argon
MAINTAINER lzientek <lucas@zientek.fr>

ENV PORT 80
ENV NODE_ENV production
ENV dbURI mongodb://mongo:27017/pokerPlanning

RUN mkdir -p /app/bin/
WORKDIR /app/

COPY package.json \
     makefile \
     gulpfile.js \
     tsconfig.json \
     typings.json  /app/

COPY src /app/src
COPY typings/index.d.ts /app/typings/
COPY typings/manual /app/typings/manual

RUN npm config set loglevel warn
RUN npm install typescript -g
RUN npm install typings -g
RUN npm install gulp -g
RUN npm install
RUN npm install gulp
RUN npm install gulp-sass
RUN npm install @types/core-js
RUN npm install run-sequence

RUN typings install
RUN make build

EXPOSE 80
CMD ["node", "/app/bin/server/server.js"]
