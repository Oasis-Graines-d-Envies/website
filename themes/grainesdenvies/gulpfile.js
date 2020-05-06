var {src,dest,series, watch} = require('gulp');
var sass = require('gulp-sass');
var uglifycss = require('gulp-uglifycss');

function scss() {
    return src('./assets/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(dest('./static/css')); 
}

function css() {
    return src('./static/css/*.css')
      .pipe(uglifycss({
          "uglyComments": true
          }))
      .pipe(dest('./static/dist')); 
}

module.exports = {
    default: series(scss,css),
    watch: watcher
}

function watcher() {
     watch('./assets/**/*.scss', series(scss,css));
}
