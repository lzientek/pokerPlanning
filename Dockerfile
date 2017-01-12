FROM node:argon
MAINTAINER lzientek <lucas@zientek.fr>

ENV PORT 80
ENV NODE_ENV production
ENV dbURI mongodb://mongo:27017/pokerPlanning

RUN mkdir -p /app/
WORKDIR /app/

COPY package.json \
     index.js \
     gulpfile.js \
     tsconfig.json \
     typings.json  /app/

COPY client /app/client
COPY server /app/server
COPY tasks /app/tasks
COPY typings/index.d.ts /app/typings/

RUN npm install typescript typings gulp -g --silent
RUN npm install gulp gulp-concat gulp-typescript gulp-clean-css gulp-rename gulp-sass gulp-rev-append gulp-uglify gulp-htmlmin gulp-imagemin gulp-util run-sequence concurrently aliv del require-dir browser-sync --silent
RUN npm install --silent
RUN npm run build-dist

EXPOSE 80
CMD ["node", "./index.js"]
