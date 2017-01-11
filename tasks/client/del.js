var gulp = require('gulp');
var del = require('del');
var co = require('./const');
var path = co.path, tasks= co.tasks;

gulp.task(tasks.CLIENT_DEL_DIST, function(){ del.sync([path.DIST])});
