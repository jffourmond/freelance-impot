var babelify = require('babelify');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var concat = require('gulp-concat');
var fs = require('fs');
var glob = require('glob');
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

gulp.task('jshint', function() {
    return gulp.src('src/scripts/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});


gulp.task('scripts', function() {

    var files = glob.sync('./es6/*.js');
    var bundler = browserify({
        entries: files,
        debug: true
    });
    bundler.transform(babelify);
    
    bundler.bundle()
        .on('error', function (err) { console.error(err); })
        .pipe(source('es6.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('.'));    

});


gulp.task("default", ["scripts"], function() {
    gulp.watch("./**", ["scripts"]);
});

