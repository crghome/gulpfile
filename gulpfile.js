const {src, dest, watch, parallel} = require('gulp');
const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');

function styles(){
    return src('templates/<YOUR_TEMPLATE>/resources/scss/**/*.scss')
        //.pipe(scss({ outputStyle: 'compressed' }).on('error', scss.logError))
        .pipe(scss({ outputStyle: 'compressed' })
            .on('error', notify.onError({
                message: "Error: <%= error.message %>",
                title: "Error running something"
            }))
        )
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 10 version'],
            grid: true
        }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest('templates/<YOUR_TEMPLATE>/css'));
        //.pipe(notify({title: 'SUCCESS', message: "CSS <%= file.relative %> build success"}));
}

function scripts(){
    return src('templates/<YOUR_TEMPLATE>/resources/js/**/*.js')
        .pipe(uglify()
            .on('error', notify.onError({
                message: "Error: <%= error.message %>",
                title: "Error running something"
            }))
        )
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest('templates/<YOUR_TEMPLATE>/js'));
        //.pipe(notify("JS <%= file.relative %> build success"));
}

function images(){
    return src('templates/<YOUR_TEMPLATE>/resources/img/**/*.{jpg,png,svggif,ico,webp}')
        .pipe(imagemin({
            progressive: true,
            interlaced: true,
            optimizationLevel: 3
        }))
        .pipe(dest('templates/<YOUR_TEMPLATE>/images'));
}

function watching(){
    watch('templates/<YOUR_TEMPLATE>/resources/scss/**/*.scss', styles);
    watch('templates/<YOUR_TEMPLATE>/resources/js/**/*.js', scripts);
    //watch('templates/<YOUR_TEMPLATE>/resources/img/**/*.{jpg,png,svggif,ico,webp}', images);
}

exports.styles = styles;
exports.scripts = scripts;
exports.images = images;

exports.watching = watching;
exports.default = parallel(watching);