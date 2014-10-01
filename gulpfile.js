var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var sourcemaps = require('gulp-sourcemaps');
var jasmine = require('gulp-jasmine');
var jshint = require('gulp-jshint');
var less = require('gulp-less');
require('jshint-stylish');
require('gulp-grunt')(gulp);

gulp.task('default', ['test', 'js']);

gulp.task('js', function() {
   gulp.src(['src/html/index.js', 'src/html/**/*.js'])
       .pipe(jshint())
       .pipe(jshint.reporter('jshint-stylish'))
       .pipe(sourcemaps.init())
       .pipe(concat('app.js'))
       .pipe(ngAnnotate())
       .pipe(uglify())
       .pipe(sourcemaps.write())
       .pipe(gulp.dest('src'));
});

gulp.task('test', function() {
    gulp.run('grunt-jasmine');
});

gulp.task('watch', ['test', 'js'], function() {
   gulp.watch(['src/html/**/*.js', 'src/test/html/**/*.spec.js'], ['test', 'js']);
});