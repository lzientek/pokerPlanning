var gulp = require('gulp');
var co = require('./const');
var path = co.path, tasks= co.tasks;

gulp.task(tasks.CLIENT_COPY, function() {
  return gulp.src(path.DEV + '**/*')
             .pipe(gulp.dest(path.DIST));
});
