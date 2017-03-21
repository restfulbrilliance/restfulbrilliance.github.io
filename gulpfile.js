/*------------------------------------------------------------------

    Description: Bliss Framwork Master Gulpfile
    Author: Robert Strube
    Version: 0.0.1

-------------------------------------------------------------------*/

var _gulp = require('gulp');
var _gulpSass = require('gulp-sass');
var _gulpAutoPrefixer = require('gulp-autoprefixer');
var _gulpRename = require('gulp-rename');
var _gulpUglify = require('gulp-uglify');
var _childProcess = require('child_process');
var _gulpUtil = require('gulp-util');
var _browserSync = require('browser-sync').create();
var _mergeStream = require('merge-stream');

var _foundationSassPaths = [
  'bower_components/foundation-sites/scss',
  'bower_components/motion-ui/src'
];

var jekyllExec = process.platform === "win32" ? "jekyll.bat" : "jekyll";

_gulp.task('sass-compile', function (gulpCallBack) {

    var sassStream = _gulp.src('_sass/bliss.scss')
      .pipe(_gulpSass({ includePaths: _foundationSassPaths, outputStyle: 'expanded' })
      .on('error', _gulpSass.logError));

    var cssStream = _gulp.src(['css/**/*.css']);

    return _mergeStream(sassStream, cssStream)
      .pipe(_gulpAutoPrefixer({ browsers: ['last 2 versions', 'ie >= 9'] }))
      .pipe(_gulp.dest('_site/css/'))
      .pipe(_browserSync.stream());
});

_gulp.task('js-compile', function (gulpCallBack) {

    return _gulp.src(['bower_components/jquery/dist/jquery.js',
                     'bower_components/what-input/what-input.js',
                     'bower_components/foundation-sites/dist/foundation.js',
                     'bower_components/jquery-cookie/jquery.cookie.js',
                     'js/**/*.js'])
      .pipe(_gulp.dest('_site/js/'))
      .pipe(_gulpRename({ suffix: '.min' }))
      .pipe(_gulpUglify())
      .pipe(_gulp.dest('_site/js/'));
});

_gulp.task('jekyll-clean', function (gulpCallBack) {

    var jekyll = _childProcess.spawn(jekyllExec, ['clean']);

    var jekyllLogger = (buffer) => {
        buffer.toString()
          .split(/\n/)
          .forEach((message) => _gulpUtil.log('Jekyll: ' + message));
    };

    jekyll.stdout.on('data', jekyllLogger);
    jekyll.stderr.on('data', jekyllLogger);

    jekyll.on('exit', function (code) {

        if (code === 0) {
            _gulpUtil.log('Jekyll: [clean] Exited Successfully');
            gulpCallBack(null);
        }

        else {
            gulpCallBack('Jekyll: [clean] Exited with Error Code = ' + code);
        }
    });
});

_gulp.task('jekyll-build', ['sass-compile', 'js-compile'], function (gulpCallBack) {

    var jekyll = _childProcess.spawn(jekyllExec, ['build']);

    var jekyllLogger = function (buffer) {
        buffer.toString()
          .split(/\n/)
          .forEach((message) => _gulpUtil.log('Jekyll: ' + message));
    };

    jekyll.stdout.on('data', jekyllLogger);
    jekyll.stderr.on('data', jekyllLogger);

    jekyll.on('exit', function (code) {

        if (code === 0){
            _gulpUtil.log('Jekyll: [build] Exited Successfully');
            gulpCallBack(null);
        }

        else
        {
            gulpCallBack('Jekyll: [build] Exited with Error Code = ' + code);
        }
    });
});

_gulp.task('browser-sync-js-reload', ['js-compile'], function () {
    _browserSync.reload();
});

_gulp.task('browser-sync-html-reload', ['jekyll-build'], function () {
    _browserSync.reload();
});

_gulp.task('browser-sync-serve', ['jekyll-build'], function () {

    _browserSync.init({
        server: {
            baseDir: './_site'
        }
    });

    _gulp.watch(['**/*.html',
                '**/*.md',
                '**/*.markdown',
                'img/**/*.*'], ['browser-sync-html-reload']);
    _gulp.watch(['_sass/**/*.scss',
                'css/**/*.css'], ['sass-compile']);
    _gulp.watch(['js/**/*.js'], ['browser-sync-js-reload']);
});

_gulp.task('default', ['browser-sync-serve'], function () {
});
