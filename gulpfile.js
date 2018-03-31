//gulp
var gulp = require('gulp');
var notify = require('gulp-notify');
var clean = require('gulp-clean');
var replace = require('gulp-replace');
var cheerio = require('gulp-cheerio');
var plumber = require('gulp-plumber');
//bower
var wiredep = require('gulp-wiredep');
//html-scripts
var useref = require('gulp-useref');
//sass=css
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var cssnano = require('gulp-cssnano');
//js
var uglify = require('gulp-uglify');
//dev
var browserSync = require('browser-sync').create();
//svg
var svgSprite = require('gulp-svg-sprite');
var svgmin = require('gulp-svgmin');
//personal
var config = {
    mode: {
        symbol: {
            sprite: "../socials-sprite.svg"
        }
    }
};

gulp.task('default', ['clean'], function(){
    gulp.run('dev');
});

gulp.task('production', ['clean'], function(){
    gulp.run('build');
});

gulp.task('dev', ['build', 'watch', 'browser-sync']);

gulp.task('build', ['svgSpriteBuild', 'html', 'css', 'js', 'assets']);

gulp.task('watch', function(){
    gulp.watch('src/css/**/*.scss', ['css']);
    gulp.watch('src/js/**/*.js', ['js']);
    gulp.watch('src/index.html', ['html']);
    gulp.watch('src/assets/**/*.*', ['assets']);
    gulp.watch('src/**/*.*').on('change', browserSync.reload);
});

gulp.task('clean', function(){
    return gulp.src('build/')
        .pipe(clean());
});

gulp.task('svgSpriteBuild', function() {
    return gulp.src('src/assets/images/socials/*.svg')
        .pipe(svgmin({
            js2svg: {
                pretty: true
            }
        }))
        .pipe(cheerio({
            run: function($) {
                $('[fill]').removeAttr('fill');
                $('[stroke]').removeAttr('stroke');
                $('[style]').removeAttr('style');
            },
            parserOptions: { xmlMode: true }
        }))
        .pipe(replace('&gt;', '>'))
        .pipe(svgSprite(config))
        .pipe(gulp.dest('src/assets/images/socials/sprite/'));
});

gulp.task('html', function(){
    gulp.src('src/index.html')
        .pipe(wiredep({
            directory: 'bower_components/'
        }))
        .pipe(gulp.dest('build/'))
        .on('end', function(){
            gulp.run('useref');
        });
});

gulp.task('useref', function(){
    return gulp.src('build/index.html')
        .pipe(useref())
        .pipe(gulp.dest('build/'));
});

gulp.task('css', function(){
    return gulp.src('src/css/main.scss')
        .pipe(plumber({
            errorHandler: notify.onError(function (err) {
                return {
                    title: 'css',
                    message: err.message
                }
            })
        }))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(concat('main.min.css'))
        .pipe(cssnano())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/css'));
});

gulp.task('js', function(){
    gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('build/js'));
});

gulp.task('assets', function(){
    return gulp.src('src/assets/**/*.*')
        .pipe(gulp.dest('build/assets'));
});

gulp.task('browser-sync', function() {
    return browserSync.init({
        server: {
            baseDir: 'build/'
        }
    });
});