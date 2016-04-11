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
            parserOptions: {
                ecmaVersion: 6,
                sourceType: 'module'
            }
        }))
        .pipe(eslint.format());
});

function packageSources(input, output){
    var files = glob.sync(input);
    var bundler = browserify({
        entries: files,
        debug: true
    });
    bundler.transform(babelify);

    bundler.bundle()
        .on('error', function(err) { console.error(err); })
        .pipe(source(output))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('.'));
}

gulp.task('scripts', function() {
    packageSources('./scripts/*.js', 'dist/freelance-impot.js');
});

gulp.task('specs', function() {
    packageSources('./specs/*.js', 'dist/freelance-impot-specs.js');
});

gulp.task('default', ['scripts', 'specs'], function() {
    gulp.watch('./**', ['scripts', 'specs']);
});

