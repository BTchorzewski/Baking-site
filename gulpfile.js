'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var csslint = require('gulp-csslint');


gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
});
gulp.task('sass', function () {
    return gulp.src('./sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
        // specifica
        browsers: ['> 1%'],
        cascade: false
    }))
        .pipe(csslint())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.reload({
        stream: true
    }));
});

gulp.task('html', function() {
    return gulp.src('./index.html')
    .pipe(browserSync.reload({
        stream: true
    }));
});

gulp.task("js", function(){
    return gulp.src("./babeljs/*.js")
    .pipe(browserSync.reload({
        stream: true
    }));
    
});

gulp.task('watch', ['browserSync', 'sass', 'html', 'js'], function () {
    gulp.watch('./sass/**/*.scss', ['sass']);
    gulp.watch('./index.html', ['html']);
    gulp.watch('./scripts/*.js', ['js']);
});
gulp.task('default', ['sass', 'watch', 'html' ]);
