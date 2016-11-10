/**
 * Created by Lzientek on 01-10-2016
 */


"use strict";

const gulp = require("gulp"),
    runSequence = require('run-sequence');

/**
/**
 * Copy all resources that are not TypeScript files into build directory. e.g. index.html, css, images
 */
gulp.task("clientResources", () => {
    return gulp.src(["src/client/**/*", "!**/*.ts","!**/*.scss", "!client/typings", "!client/typings/**", "!client/*.json"])
        .pipe(gulp.dest("bin/client"));
});

var sass = require('gulp-sass');
 
gulp.task('sass', function () {
  return gulp.src('src/client/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('bin/client'));
});

/**
 * Copy all required libraries into build directory.
 */
gulp.task("libs", () => {
    return gulp.src([
        'node_modules/core-js/client/shim.min.js',
        'node_modules/zone.js/dist/zone.js',
        'node_modules/reflect-metadata/Reflect.js',
        'node_modules/systemjs/dist/system.src.js',
        'node_modules/socket.io-client/socket.io.js'
    ])
    .pipe(gulp.dest("bin/client/libs"));
});


gulp.task("copyclient", function (callback) {
    runSequence('clientResources','sass', 'libs', callback);
});

