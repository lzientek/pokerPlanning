var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var rev = require('gulp-rev-append');
var co = require('./const');
var path = co.path, tasks= co.tasks;

var VIEWS = path.DIST + '**/*.html';

gulp.task(tasks.CLIENT_VIEWS_DIST, function() {
  return gulp.src(VIEWS, {base: path.DIST})
             .pipe(rev())
			       .pipe(htmlmin({
               collapseWhitespace: true,
               caseSensitive: true
             }))
             .pipe(gulp.dest(path.DIST));
});
