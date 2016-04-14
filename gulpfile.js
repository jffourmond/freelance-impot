var babelify = require('babelify');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var concat = require('gulp-concat');
var debug = require('gulp-debug');
var glob = require('glob');
var gulp = require('gulp');
var eslint = require('gulp-eslint');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');


function lint(input) {
    return gulp.src(input)
        .pipe(eslint({
            extends: "eslint:recommended",
            env: {
                browser: true,
                es6: true, 
                jasmine: true
            },
            globals: {
                angular: true
            },
            parserOptions: {
                "sourceType": "module"
            }
        }))
        .pipe(eslint.format());
}

function packageSources(input, output) {
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
        .pipe(debug())
        .pipe(gulp.dest('.'));
}


gulp.task('eslint-scripts', function() {
    lint('./scripts/*.js');
});

gulp.task('scripts', ['eslint-scripts'], function() {
    packageSources('./scripts/*.js', 'dist/freelance-impot.js');
});

gulp.task('eslint-specs', function() {
    lint('./specs/*.js');
});

gulp.task('specs', ['eslint-specs'], function() {
    packageSources('./specs/*.js', 'dist/freelance-impot-specs.js');
});

gulp.task('default', ['specs', 'scripts']);

