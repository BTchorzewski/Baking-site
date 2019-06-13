'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var csslint = require('gulp-csslint');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
gulp.task('server', function () {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
});

gulp.task('sass', function () {
    return gulp.src('./sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(csslint())
        .pipe(gulp.dest('./css/'))
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


gulp.task('start', ['server', 'sass', 'html', 'js'], function () {
    gulp.watch('./sass/**/*.scss', ['sass']);
    gulp.watch('./index.html', ['html']);
    gulp.watch('./scripts/*.js', ['js']);
});

gulp.task('build', function () {
    return gulp.src('./sass/style.scss')
        .pipe(sass())
        .pipe(sourcemaps.init())
        .pipe(autoprefixer({
        browsers: ['last 10 versions']
    }))
        .pipe(sourcemaps.write())
        .pipe(cleanCSS())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('./css'))
    });



gulp.task('default', ['sass', 'watch', 'html' ]);
