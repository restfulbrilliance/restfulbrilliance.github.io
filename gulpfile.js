/*------------------------------------------------------------------

    Description: Gulpfile for Foundation + Jekyll
    Author: Robert Strube
    Version: 1.0

-------------------------------------------------------------------*/

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoPrefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
//var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var child = require('child_process');
var util = require('gulp-util');
var browserSync = require('browser-sync').create();
var mergeStream = require('merge-stream');

var foundationSassPaths = [
  'bower_components/foundation-sites/scss',
  'bower_components/motion-ui/src'
];

var jekyllExec = process.platform === "win32" ? "jekyll.bat" : "jekyll";

gulp.task('sass-compile', function (gulpCallBack) {

    var sassStream = gulp.src('_sass/compiled-foundation.scss')
      .pipe(sass({ includePaths: foundationSassPaths, outputStyle: 'expanded' })
      .on('error', sass.logError));

    var cssStream = gulp.src(['css/**/*.css']);

    return mergeStream(sassStream, cssStream)
      .pipe(autoPrefixer({ browsers: ['last 2 versions', 'ie >= 9'] }))
      .pipe(gulp.dest('_site/css/'))
      //.pipe(rename({ suffix: '.min' }))
      //.pipe(cleanCSS())
      //.pipe(gulp.dest('_site/css/'))
      .pipe(browserSync.stream());

    gulpCallBack(null);
});

gulp.task('js-compile', function (gulpCallBack) {
    return gulp.src(['bower_components/jquery/dist/jquery.js',
                     'bower_components/what-input/what-input.js',
                     'bower_components/foundation-sites/dist/foundation.js',
                     'bower_components/jquery-cookie/jquery.cookie.js',
                     'js/**/*.js'])
      .pipe(gulp.dest('_site/js/'))
      .pipe(rename({ suffix: '.min' }))
      .pipe(uglify())
      .pipe(gulp.dest('_site/js/'));

    gulpCallBack(null);
});

gulp.task('jekyll-clean', function (gulpCallBack) {

    var jekyll = child.spawn(jekyllExec, ['clean']);

    var jekyllLogger = (buffer) => {
        buffer.toString()
          .split(/\n/)
          .forEach((message) => util.log('Jekyll: ' + message));
    };

    jekyll.stdout.on('data', jekyllLogger);
    jekyll.stderr.on('data', jekyllLogger);

    jekyll.on('exit', function (code) {

        if (code === 0) {
            util.log('Jekyll: [clean] Exited Successfully');
            gulpCallBack(null);
        }

        else {
            gulpCallBack('Jekyll: [clean] Exited with Error Code = ' + code);
        }
    });
});

gulp.task('jekyll-build', ['sass-compile', 'js-compile'], function (gulpCallBack) {

    var jekyll = child.spawn(jekyllExec, ['build']);

    var jekyllLogger = function (buffer) {
        buffer.toString()
          .split(/\n/)
          .forEach((message) => util.log('Jekyll: ' + message));
    };

    jekyll.stdout.on('data', jekyllLogger);
    jekyll.stderr.on('data', jekyllLogger);

    jekyll.on('exit', function (code) {

        if (code === 0){
            util.log('Jekyll: [build] Exited Successfully');
            gulpCallBack(null);
        }

        else
        {
            gulpCallBack('Jekyll: [build] Exited with Error Code = ' + code);
        }
    });
});

gulp.task('browser-sync-js-reload', ['js-compile'], function () {
    browserSync.reload();
});

gulp.task('browser-sync-html-reload', ['jekyll-build'], function () {
    browserSync.reload();
});

gulp.task('browser-sync-serve', ['jekyll-build'], function () {

    browserSync.init({
        server: {
            baseDir: './_site'
        }
    });

    gulp.watch(['**/*.html',
                '**/*.md',
                '**/*.markdown',
                'img/**/*.*'], ['browser-sync-html-reload']);
    gulp.watch(['_sass/**/*.scss',
                'css/**/*.css'], ['sass-compile']);
    gulp.watch(['js/**/*.js'], ['browser-sync-js-reload']);
});

gulp.task('default', ['browser-sync-serve'], function () {
});
