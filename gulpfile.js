const gulp = require('gulp'),
  browserSync = require('browser-sync').create(),
  reload = browserSync.reload,
  sass = require('gulp-sass'),
  sassglob = require('gulp-sass-glob'),
  imagemin = require('gulp-imagemin'),
  sourcemaps = require('gulp-sourcemaps');

gulp.task('server', () => {
  browserSync.init({
    notify: false,
    server: {
      baseDir: './dist'
    }
  });
});
gulp.task('img', () => {
  gulp
    .src('./src/img/**/*.*')
    .pipe(
      imagemin({
        progressive: true,
        interlaced: true
      })
    )
    .pipe(gulp.dest('./dist/img/'));
});
gulp.task('css', () => {
  return gulp
    .src('./src/scss/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sassglob())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css/'))
    .pipe(reload({ stream: true }));
});

gulp.task('html', () => {
  gulp
    .src('./src/html/index.html')
    .pipe(gulp.dest('dist/'))
    .pipe(reload({ stream: true }));
});
gulp.task('watch', () => {
  gulp.watch('./src/html/*.html', ['html']);
  gulp.watch('./src/scss/modules/*.scss', ['css']);
});
gulp.task('default', ['html', 'css', 'server', 'watch']);
