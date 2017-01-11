var gulp = require('gulp');
var tsc = require('gulp-typescript');

var TS_CONFIG = './tsconfig.json';

gulp.task('server.compile_tsc', function() {
  var tsconfigSrc = tsc.createProject(TS_CONFIG);

  return tsconfigSrc.src()
                    .pipe(tsc(tsconfigSrc))
                    .js
                    .pipe(gulp.dest('.'));
});
