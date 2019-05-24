'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var csslint = require('gulp-csslint');
var cleanCSS = require('gulp-clean-css');
// .pipe(cleanCSS({compatibility: 'ie8'}))
gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
});
// .pipe(sass().on('error', sass.logError))
gulp.task('sass', function () {
    return gulp.src('./sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.init())
        .pipe(autoprefixer({
        // specifica
        browsers: ['> 1%'],
        cascade: false
    }))
        .pipe(csslint())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./css/style'))
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
