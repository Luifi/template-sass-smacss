// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    imagemin = require('gulp-imagemin');

// Compile Our Sass
gulp.task('styles', function() {

    return gulp.src('scss/main.scss')
    .pipe(sass())
    .pipe(gulp.dest('css')) // Dev normal CSS

    .pipe(minifycss())
    .pipe(gulp.dest('public_html/css')) // Live Minify CSS

    .pipe(notify({ message: 'styles task complete' }));

});

// JS Minify
gulp.task('scripts', function() {
    gulp.src('js/*.js')
    .pipe(gulp.dest('js')) // Dev normal JS

    .pipe(uglify())
    .pipe(gulp.dest('public_html/js')) // Live minify JS

    .pipe(notify({ message: 'JS task complete' }));
});

// Images
gulp.task('images', function() {
  return gulp.src('src/img/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('public_html/img'))
    .pipe(notify({ message: 'Images task complete' }));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('scss/**/*.scss', ['styles']);
    gulp.watch('js/*.js', ['scripts']);
    gulp.watch('img/**/*', ['images']);
});

// Default Task
gulp.task('default', ['styles', 'scripts', 'images', 'watch']);