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
var _path = require('path');
var _runSequence = require('run-sequence');

var _bowerSassPaths = [
  'bower_components/foundation-sites/scss',
  'bower_components/motion-ui/src'
];

var _jekyllExec = process.platform === "win32" ? "jekyll.bat" : "jekyll";
var _jekyllBuildInProgress = false;

//build tasks
//-----------------------------------------------
_gulp.task('sass-build', function () {

    var sassStream = _gulp.src('_sass/theme.scss')
      .pipe(_gulpSass({ includePaths: _bowerSassPaths, outputStyle: 'expanded' })
      .on('error', _gulpSass.logError));

    var cssStream = _gulp.src(['css/**/*.css']);

    return _mergeStream(sassStream, cssStream)
      .pipe(_gulpAutoPrefixer({ browsers: ['last 2 versions', 'ie >= 9'] }))
      .pipe(_gulp.dest('_site/css/'))
      .pipe(_browserSync.stream());
});

_gulp.task('js-build', function () {

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

_gulp.task('jekyll-build', ['sass-build', 'js-build'], function (done) {

    _jekyllBuildInProgress = true;

    var sourceDir = _path.resolve(process.cwd());
    _gulpUtil.log('Jekyll: Source Directory = ' + sourceDir);

    var jekyll = _childProcess.spawn(_jekyllExec, ['build'], { shell: true });

    var jekyllLogger = function (buffer) {
        buffer.toString()
            .split(/\n/)
            .forEach((message) => _gulpUtil.log('Jekyll: ' + message));
    };

    jekyll.stdout.on('data', jekyllLogger);
    jekyll.stderr.on('data', jekyllLogger);

    jekyll.on('exit', function (code) {

        if (code === 0) {
            _gulpUtil.log('Jekyll: [build] Exited Successfully');
            _jekyllBuildInProgress = false;
            done();
        }

        else {
            _jekyllBuildInProgress = false;
            done('Jekyll: [build] Exited with Error Code = ' + code);
        }
    });
});

//git tasks and functions
//-----------------------------------------------------------------------------------------------
_gulp.task('git-add', ['jekyll-build'], function (done) {

    if (_browserSync.active)
        _browserSync.exit();

    var siteDir = _path.resolve(process.cwd(), './_site');
    gitAdd(siteDir);
    done();
});

_gulp.task('git-commit', ['git-add'], function (done) {

    var siteDir = _path.resolve(process.cwd(), './_site');
    gitCommit(siteDir);
    done();
});

_gulp.task('git-push', ['git-commit'], function (done) {

    var siteDir = _path.resolve(process.cwd(), './_site');
    gitPush(siteDir, 'master');
    done();
});

_gulp.task('git-add-source', function (done) {

    gitAdd(process.cwd());
    done();
});

_gulp.task('git-commit-source', ['git-add-source'], function (done) {

    gitCommit(process.cwd());
    done();
});

_gulp.task('git-push-source', ['git-commit-source'], function (done) {

    gitPush(process.cwd(), 'source');
    done();
});

var gitAdd = function gitAdd(dir) {

    _gulpUtil.log('Git: [add .] in ' + dir);

    var git = _childProcess.spawn('git', ['add', '.'], { shell: true, cwd: dir });

    var gitLogger = function (buffer) {
        buffer.toString()
            .split(/\n/)
            .forEach((message) => _gulpUtil.log('Git: ' + message));
    };

    git.stdout.on('data', gitLogger);
    git.stderr.on('data', gitLogger);

    git.on('exit', function (code) {

        if (code === 0)
            _gulpUtil.log('Git: [add .] Exited Successfully');

        else
            _gulpUtil.log('Git: [add .] Exited with Error Code = ' + code);
    });
};

var gitCommit = function (dir) {

    _gulpUtil.log('Git: [commit] in ' + dir);
    
    var git = _childProcess.spawn('git', ['commit', '-m', 'gulp source commit'], { shell: true, cwd: dir });

    var gitLogger = function (buffer) {
        buffer.toString()
            .split(/\n/)
            .forEach((message) => _gulpUtil.log('Git: ' + message));
    };

    git.stdout.on('data', gitLogger);
    git.stderr.on('data', gitLogger);

    git.on('exit', function (code) {

        if (code === 0)
            _gulpUtil.log('Git: [commit] Exited Successfully');
        
        else
            done('Git: [commit] Exited with Error Code = ' + code);
    });
};

var gitPush = function (dir, branch) {

    _gulpUtil.log('Git: [push origin ' + branch + '] in ' + dir);

    var git = _childProcess.spawn('git', ['push', 'origin', branch], { shell: true, cwd: dir });

    var gitLogger = function (buffer) {
        buffer.toString()
            .split(/\n/)
            .forEach((message) => _gulpUtil.log('Git: ' + message));
    };

    git.stdout.on('data', gitLogger);
    git.stderr.on('data', gitLogger);

    git.on('exit', function (code) {

        if (code === 0)
            _gulpUtil.log('Git: [push origin source] Exited Successfully');

        else
            done('Git: [push origin source] Exited with Error Code = ' + code);
    });
};

//change tasks
//-----------------------------------------------------------------------------------------------

_gulp.task('sass-change', function (done) {

    if (!_jekyllBuildInProgress) {
        _gulp.start('sass-build');
    }
});

_gulp.task('js-change', function (done) {

    if (!_jekyllBuildInProgress) {
        _runSequence('js-build', 'reload');
    }
});

_gulp.task('jekyll-change', function (done) {

    if (!_jekyllBuildInProgress) {
        _runSequence('jekyll-build', 'reload');
    }
});

//browsersync tasks
//-----------------------------------------------------------------------------------------------

_gulp.task('serve', ['jekyll-build'], function (done) {

    _browserSync.init({
        server: {
            baseDir: './_site'
        }
    });

    _gulp.watch(['**/*.html', '**/*.md', '**/*.markdown', 'img/**/*.*'], ['jekyll-change']);
    _gulp.watch(['_sass/**/*.scss', 'css/**/*.css'], ['sass-change']);
    _gulp.watch(['js/**/*.js'], ['js-change']);

    done();
});

_gulp.task('exit', function (done) {

    _browserSync.exit();
    done();
});

_gulp.task('reload', function (done) {

    _browserSync.reload();
    done();
});

//default task
//-----------------------------------------------------------------------------------------------

_gulp.task('default', ['serve'], function () { });
