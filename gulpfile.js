const babel = require('gulp-babel');
const concat = require('gulp-concat');
const gulp = require('gulp');
const jshint = require('gulp-jshint');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('jshint', function() {
    return gulp.src('src/scripts/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('scripts', function() {
    return gulp.src(['es6/*.js'])
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('es6.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('.'))
});

gulp.task("default", ["scripts"], function() {
    gulp.watch("./**", ["scripts"]);
});

