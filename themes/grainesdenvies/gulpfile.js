var {src,dest,series, watch} = require('gulp');
var sass = require('gulp-sass');
var cssnano = require('cssnano');
var postcss = require('gulp-postcss');

function scss() {
    return src('./assets/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(dest('./static/css')); 
}

function css() {
    var plugins = [
        cssnano(),
    ];
    return src('./static/css/*.css')
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
