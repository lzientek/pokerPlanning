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
    return gulp.src(["src/client/**/*", "!**/*.ts", "!client/typings", "!client/typings/**", "!client/*.json"])
        .pipe(gulp.dest("bin/client"));
});

/**
 * Copy all required libraries into build directory.
 */
gulp.task("libs", () => {
    return gulp.src([
        'core-js/client/**',
        'zone.js/dist/zone.js',
        'reflect-metadata/Reflect.js',
        'reflect-metadata/Reflect.js.map',
        'systemjs/dist/system.src.js',
        'socket.io-client/socket.io.js'
    ], { cwd: "node_modules/**" }) /* Glob required here. */
        .pipe(gulp.dest("bin/client/libs"));
});


gulp.task("copyclient", function (callback) {
    runSequence('clientResources', 'libs', callback);
});

