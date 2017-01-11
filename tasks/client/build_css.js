var gulp = require('gulp');
var cssmin = require('gulp-clean-css');
var sass = require('gulp-sass');
var co = require('./const');
var path = co.path, tasks= co.tasks;

var CSS = path.DIST + '**/*.css';
 
gulp.task(tasks.CLIENT_BUILD_SASS, function () {
  return gulp.src(path.DEV +'**/*.scss', {base: path.DEV})
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('.'));
});

gulp.task(tasks.CLIENT_CSS_DIST, function() {
  return gulp.src(CSS, {base: path.DIST})
             .pipe(cssmin())
             .pipe(gulp.dest(path.DIST));
});
