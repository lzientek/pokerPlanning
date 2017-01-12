var gulp = require('gulp');
var browserSync = require('browser-sync');
var co = require('./const');
var path = co.path, tasks= co.tasks;
var TS = path.DEV + '**/*.ts';
var SASS = path.DEV + '**/*.scss';
var HTML = path.DEV + '**/*.html';

gulp.task(tasks.CLIENT_RELOAD, function() {
  return browserSync.reload();
});

gulp.task(tasks.CLIENT_WATCH, [tasks.CLIENT_BUILD_TS, tasks.CLIENT_BUILD_SASS], function() {
  
  browserSync({proxy: "http://localhost:3000", reloadDelay: 1000});
  

  var _watchable = [];

  _watchable.push(TS);
  _watchable.push(SASS);
  _watchable.push(HTML);

  return gulp.watch(_watchable, [tasks.CLIENT_BUILD_TS, tasks.CLIENT_BUILD_SASS, tasks.CLIENT_RELOAD]);
});
