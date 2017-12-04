var gulp = require('gulp');
var stylus = require('gulp-stylus');


gulp.task('main', function (done) {
  return gulp.src('./assets/stylus/main.styl')
    .pipe(stylus()).on('error', function(error) {
      // we have an error
      done(error);
    })
    .pipe(gulp.dest('./assets/stylus'));
});

gulp.task('admin', function (done) {
  return gulp.src('./assets/stylus/admin.styl')
    .pipe(stylus()).on('error', function(error) {
      // we have an error
      done(error);
    })
    .pipe(gulp.dest('./assets/stylus'));
});

gulp.task('default', ['main']);
