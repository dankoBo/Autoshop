const { src, dest, parallel, series, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const prefix = require('gulp-autoprefixer');

function browser() {
    browserSync.init({
        server: {
            baseDir: './app/'
        },
        notify: false
    });
}
function watchFiles() {
    watch("app/scss/**/*.scss", css);
    watch("app/*.html").on('change', browserSync.reload);
}
function css() {
    return src("app/scss/**/*.scss")
        .pipe(sass())
        .pipe(dest("app/css"))
        .pipe(prefix(['last 15 versions','> 1%','ie 8','ie 7','iOS >= 9','Safari >= 9','Android >= 4.4','Opera >= 30'], {
            cascade: true
        }))
        .pipe(browserSync.stream());
}
exports.css = css;
exports.default = series(series(css), parallel(browser, watchFiles));