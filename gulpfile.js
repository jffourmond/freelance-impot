var babel = require('gulp-babel');
var concat = require('gulp-concat');
var gulp = require('gulp');
var jshint = require('gulp-jshint');

gulp.task('jshint', function() {
  return gulp.src('src/scripts/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('scripts', function(){
  return gulp.src(['es6/*.js'])
    .pipe(babel({
			presets: ['es2015']
		}))
    .pipe(concat('es6.js'))
    .pipe(gulp.dest('.'))
});

gulp.task('default', ['jshint', 'scripts']);
