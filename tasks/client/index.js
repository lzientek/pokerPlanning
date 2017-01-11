var gulp = require('gulp');
var runSequence = require('run-sequence');
var tasks = require('./const').tasks;

gulp.task(tasks.CLIENT_BUILD_DEV, [
  tasks.CLIENT_BUILD_TS,
  tasks.CLIENT_BUILD_SASS,
]);

gulp.task(tasks.CLIENT_BUILD_DIST, function() {
  return new Promise((resolve, reject) => {
    runSequence(
              tasks.CLIENT_BUILD_TS,
              tasks.CLIENT_BUILD_SASS,
              tasks.CLIENT_DEL_DIST,
              tasks.CLIENT_COPY,
              tasks.CLIENT_VIEWS_DIST,
              [
                tasks.CLIENT_IMAGE_DIST,
                tasks.CLIENT_JS_DIST
              ],
              
              resolve
            );  
  });  
});
