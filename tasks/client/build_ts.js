var gulp = require('gulp');
var tsc = require('gulp-typescript');
var co = require('./const');
var path = co.path, tasks= co.tasks;

var TS_CONFIG = path.ROOT + 'tsconfig.json';

gulp.task(tasks.CLIENT_BUILD_TS, function() {
  let _tsProject = tsc.createProject(TS_CONFIG);

  return _tsProject.src()
                   .pipe(_tsProject())
                   .js
                   .pipe(gulp.dest('.'));
});
