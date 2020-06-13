'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');

sass.compiler = require('node-sass');

function buildSass() {
    return gulp.src('./app/sass/main.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(gulp.dest("../WebApp/public/css"));
}





exports.build = gulp.series(buildSass);