var gulp = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');
var es6transpiler = require('gulp-es6-transpiler');

gulp.task('compile-js', function () {
    return gulp.src('src/js/*.js')
        .pipe(concat('script.js'))
        .pipe(es6transpiler({
            disallowUnknownReferences: false
        }))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('compile-less', function () {
    return gulp.src('src/less/*.less')
        .pipe(less())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('master', ['compile-less', 'compile-js']);

gulp.task('default', ['master']);