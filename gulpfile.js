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
  return gulp.src([
      'app/scripts/*.js', 
      '!app/scripts/*Spec.js', 
      'app/lib/angular-nvd3-directives.min.js'])
    .pipe(babel({
			presets: ['es2015']
		}))
    .pipe(concat('freelance-impot.js'))
    .pipe(gulp.dest('app/dist/'))
});

gulp.task('default', ['jshint', 'scripts']);
