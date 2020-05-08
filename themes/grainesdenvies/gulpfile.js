var {src,dest,series, watch} = require('gulp');
var sass = require('gulp-sass');
var cssnano = require('cssnano');
var postcss = require('gulp-postcss');
var concatCss = require('gulp-concat-css');
var comments = require('postcss-discard-comments');
var minify = require('gulp-minify');

function scss() {
    return src('./assets/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(dest('./static/css')); 
}

function js() {
    return src('./static/js/*.js')
        .pipe(minify({noSource:true}))
        .pipe(dest('./static/dist/'));
}

function css() {
    var plugins = [
        comments({removeAll: true}),
        cssnano(),
    ];
    return src('./static/css/*.css')
        .pipe(concatCss("styles.css"))
        .pipe(postcss(plugins))
        .pipe(dest('./static/dist'));
}

module.exports = {
    default: series(scss,css,js),
    watch: watcher
}

function watcher() {
     watch('./assets/**/*.scss', series(scss,css));
     watch('./static/js/*.js', js);
}
