var {src,dest,series, watch} = require('gulp');
var sass = require('gulp-sass');
var cssnano = require('cssnano');
var postcss = require('gulp-postcss');
var concatCss = require('gulp-concat-css');
var comments = require('postcss-discard-comments');

function scss() {
    return src('./assets/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(dest('./static/css')); 
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
    default: series(scss,css),
    watch: watcher
}

function watcher() {
     watch('./assets/**/*.scss', series(scss,css));
}
