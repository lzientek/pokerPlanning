var gulp = require('gulp');
var uglify = require('gulp-uglify');
var co = require('./const');
var path = co.path, tasks= co.tasks;

var JS = path.DIST + '**/*.js';

gulp.task(tasks.CLIENT_JS_DIST, function() {
  return gulp.src(JS, {base: path.DIST})
             .pipe(uglify())
             .pipe(gulp.dest(path.DIST));
});
