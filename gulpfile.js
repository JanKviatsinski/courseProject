const {series, parallel,src, dest,watch} = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const gulpClean = require('gulp-clean');
const browserSync = require('browser-sync').create();
const imageminImg = require('gulp-imagemin');



function serve() {
    browserSync.init({
        server: 'build',
        watch: true,
        notify: false
    });
}

function clean() {
    return src('build', {read: false, allowEmpty: true}).pipe(gulpClean());
}

function copyHTML(_cb) {
    return src('src/index.html').pipe(dest('build'));
}

function copyJS(_cb) {
    return src('src/js/*.js').pipe(dest('build'));
}

function transformSCSS() {
    return src('src/styles/**/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(concat('index.css'))
        .pipe(dest('build'));
}

function imagemin () {
    return src('src/img/*')
        .pipe(imageminImg())
        .pipe(dest('build/img'));
}

function watchTasks() {
    watch('src/js/*.js', copyJS);
    watch('src/index.html', copyHTML);
    watch('src/styles/**/*.scss', transformSCSS);
}

exports.clean = clean;
exports.watch = watchTasks;
exports.style = transformSCSS;
exports.imagemin = imagemin;
exports.default = series(
    clean,
    parallel(copyHTML, copyJS, transformSCSS, imagemin),
    parallel(watchTasks, serve));