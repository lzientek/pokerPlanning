var gulp = require('gulp');
var imageMin = require('gulp-imagemin');
var co = require('./const');
var path = co.path, tasks= co.tasks;

const IMAGES = path.DIST + '**/*.{png,jpg,jpeg,svg,gif}';

gulp.task(tasks.CLIENT_IMAGE_DIST, function() {
  return gulp.src(IMAGES, {base: path.DIST})
			       .pipe(imageMin())
             .pipe(gulp.dest(path.DIST));
});
