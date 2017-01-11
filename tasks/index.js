
var gulp = require('gulp');
var tasks = require('./client/const').tasks;

gulp.task('default', [tasks.CLIENT_WATCH]);

require('require-dir')('client');


require('require-dir')('server');

