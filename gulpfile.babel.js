import gulp from 'gulp';
import browserify from 'gulp-browserify';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import coveralls from 'gulp-coveralls';
import {Server as Karma} from 'karma';

gulp.task('build', ['build-commonjs', 'build-es2015']);

gulp.task('build-commonjs', () => {
  return gulp.src('build/xtorage.js')
             .pipe(babel({
               plugins: ['transform-es2015-modules-commonjs']
             }))
             .pipe(uglify())
             .pipe(rename({
               suffix: '.min'
             }))
             .pipe(gulp.dest('dist/commonjs'));
});

gulp.task('build-es2015', () => {
  return gulp.src('build/xtorage.js')
             .pipe(rename({
               suffix: '.min'
             }))
             .pipe(gulp.dest('dist/es2015'));
});

gulp.task('unit_test', (done) => {
  let _karma = new Karma({
    configFile: __dirname + '/karma.conf.js'
  }, done);

  return _karma.start();
});

gulp.task('coveralls', ['test'], () => {
    return gulp.src(FILE_COVERAGE)
            .pipe(coveralls());
});
