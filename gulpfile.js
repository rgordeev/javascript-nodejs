var gulp   = require('gulp');
var jshint = require('gulp-jshint');

const serverDirs = 'lib,config,controllers,error,models,routes,setup'.split(',');

gulp.task('lint', function() {
  return gulp.src(serverDirs.map(function(dir) { return dir + '/**/*.js'; }))
    .pipe(jshint({
      maxerr: 25,
      latedef: true,
      browser: false,
      node: true,
      indent: 2,
      camelcase: true,
      newcap: true,
      undef: true,
      esnext: true
    }))
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'))
});