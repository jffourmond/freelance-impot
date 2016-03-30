var babelify = require('babelify');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var concat = require('gulp-concat');
var glob = require('glob');
var gulp = require('gulp');
var eslint = require('gulp-eslint');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('eslint', function() {
    return gulp.src('./scripts/*.js')
        .pipe(eslint({
            env: {
                es6: true
            }, parserOptions: {
                sourceType: "module"
            }
        }))
        .pipe(eslint.format());
});


gulp.task('scripts', function() {

    var files = glob.sync('./scripts/*.js');
    var bundler = browserify({
        entries: files,
        debug: true
    });
    bundler.transform(babelify);

    bundler.bundle()
        .on('error', function(err) { console.error(err); })
        .pipe(source('dist/freelance-impot.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('.'));

});


gulp.task("default", ["scripts"], function() {
    gulp.watch("./**", ["scripts"]);
});

