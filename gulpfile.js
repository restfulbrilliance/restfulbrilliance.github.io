/*------------------------------------------------------------------

    Description: Bliss Framwork Master Gulpfile
    Author: Robert Strube
    Version: 0.8.0 

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
var del = require('del');

var _bowerSassPaths = [
  'bower_components/foundation-sites/scss',
  'bower_components/motion-ui/src'
];

var _jekyllExec = process.platform === "win32" ? "jekyll.bat" : "jekyll";
var _jekyllBuildInProgress = false;

/*------------------------------------------------------------------
    Task: sass-build
    Desription: generates ./_site/css/theme.css from
        ./_sass/theme.scss also copies all .css files from ./css/ to
        ./site/css. This allows developers to include static css into
        their generated site
-------------------------------------------------------------------*/
_gulp.task('sass-build', ['clean-css'], function () {

    var sassStream = _gulp.src('_sass/theme.scss')
      .pipe(_gulpSass({ includePaths: _bowerSassPaths, outputStyle: 'expanded' })
      .on('error', _gulpSass.logError));

    var cssStream = _gulp.src(['css/**/*.css']);

    return _mergeStream(sassStream, cssStream)
      .pipe(_gulpAutoPrefixer({ browsers: ['last 2 versions', 'ie >= 9'] }))
      .pipe(_gulp.dest('_site/css/'))
      .pipe(_browserSync.stream());
});

/*------------------------------------------------------------------
    Task: js-build
    Desription: generates minified js files from Bower js files and
        any additional js files that are in ./js/ This allows
        developers to include additional non-Bower js into their
        generated site
-------------------------------------------------------------------*/
_gulp.task('js-build', ['clean-js'], function () {

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

/*------------------------------------------------------------------
    Task: jekyll-build
    Desription: runs the Jekyll build process which parses all
        markdown and generates static HTML in ./_site
        Please note that Jekyll is not used to generate css from
        SASS or minify the JS, Gulp handles this
-------------------------------------------------------------------*/
_gulp.task('jekyll-build', ['sass-build', 'js-build', 'clean-html'], function (done) {

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

/*------------------------------------------------------------------
    Task: clean-html
    Desription: removes all generated files in /_site directory
        *execpt* for JS and CSS and the .git directory
-------------------------------------------------------------------*/
_gulp.task('clean-html', function () {

  return del([
    '_site/**/*',
    '!_site/**/*.js',
    '!_site/**/*.css',
    // we don't want to clean the .git directory though so we negate the pattern
    '!_site/.git'
  ]);
});

/*------------------------------------------------------------------
    Task: clean-js
    Desription: removes all generated JS files in /_site directory
-------------------------------------------------------------------*/
_gulp.task('clean-js', function () {

  return del([
    '_site/**/*.js',
  ]);
});

/*------------------------------------------------------------------
    Task: clean-html
    Desription: removes all generated CSS files in /_site directory
-------------------------------------------------------------------*/
_gulp.task('clean-css', function () {

  return del([
    '_site/**/*.css',
  ]);
});

/*------------------------------------------------------------------
    Task: git-add-site
    Desription: runs 'git add .' for the /_site repo
-------------------------------------------------------------------*/
_gulp.task('git-add-site', ['jekyll-build'], function (done) {

    if (_browserSync.active)
        _browserSync.exit();

    var siteDir = _path.resolve(process.cwd(), './_site');
    gitAdd(siteDir, done);
});

/*------------------------------------------------------------------
    Task: git-commit-site
    Desription: runs 'git commit' for the /_site repo
-------------------------------------------------------------------*/
_gulp.task('git-commit-site', ['git-add-site'], function (done) {

    var siteDir = _path.resolve(process.cwd(), './_site');
    gitCommit(siteDir, done);
});

/*------------------------------------------------------------------
    Task: git-push-site
    Desription: runs 'git push origin master' for the /_site repo
-------------------------------------------------------------------*/
_gulp.task('git-push-site', ['git-commit-site'], function (done) {

    var siteDir = _path.resolve(process.cwd(), './_site');
    gitPush(siteDir, 'master', done);
});

/*------------------------------------------------------------------
    Task: git-add-source
    Desription: runs 'git add .' for the <source> repo
-------------------------------------------------------------------*/
_gulp.task('git-add-source', function (done) {
    gitAdd(process.cwd(), done);
});

/*------------------------------------------------------------------
    Task: git-commit-source
    Desription: runs 'git commit' for the <source> repo
-------------------------------------------------------------------*/
_gulp.task('git-commit-source', ['git-add-source'], function (done) {
    gitCommit(process.cwd(), done);
});

/*------------------------------------------------------------------
    Task: git-push-source
    Desription: runs 'git push origin source' for the <source> repo
-------------------------------------------------------------------*/
_gulp.task('git-push-source', ['git-commit-source'], function (done) {
    gitPush(process.cwd(), 'source', done);
});

/*------------------------------------------------------------------
    Git helper functions used to consolidate logic
-------------------------------------------------------------------*/
var gitAdd = function gitAdd(dir, done) {

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

        if (code === 0) {
            _gulpUtil.log('Git: [add .] Exited Successfully');
            done();
        }

        else
           done('Git: [add .] Exited with Error Code = ' + code);
    });
};

var gitCommit = function (dir, done) {

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

        if (code === 0) {
            _gulpUtil.log('Git: [commit] Exited Successfully');
            done();
        }
        
        else
            done('Git: [commit] Exited with Error Code = ' + code);
    });
};

var gitPush = function (dir, branch, done) {

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

        if (code === 0) {
            _gulpUtil.log('Git: [push origin ' + branch + '] Exited Successfully');
            done();
        }

        else
            done('Git: [push origin ' + branch + '] Exited with Error Code = ' + code);
    });
};

/*------------------------------------------------------------------
    Task: watch
    Desription: establishes main watches on files outside the /_site
        directory.  If we were to watch those files, there would be
        an infinite loop
-------------------------------------------------------------------*/
_gulp.task('watch', function(){
    _gulp.watch(['**/*.html', '**/*.md', '**/*.markdown', 'img/**/*.*', '!_site/**/*.*'], ['jekyll-change']);
    _gulp.watch(['_sass/**/*.scss', 'css/**/*.css', '!site/**/*.*'], ['sass-change']);
    _gulp.watch(['js/**/*.js', '!_site/**/*.*'], ['js-change']);
});

/*------------------------------------------------------------------
    Task: sass-change
    Desription: triggered when SASS file(s) are changed in the source
        directory, calls sass-build, then browsersync-reload, then
        lets the watch know it's complete
-------------------------------------------------------------------*/
_gulp.task('sass-change', function (done) {

    if (!_jekyllBuildInProgress) {
        _gulpUtil.log('Gulp: SASS change(s) detected');
        return _gulp.start('sass-build', done);
    }

    done();
});

/*------------------------------------------------------------------
    Task: js-change
    Desription: triggered when JS file(s) are changed in the source
        directory, calls js-build, then browsersync-reload, then
        lets the watch know it's complete
-------------------------------------------------------------------*/
_gulp.task('js-change', function (done) {

    if (!_jekyllBuildInProgress) {
        _gulpUtil.log('Gulp: JS change(s) detected');
        return _runSequence('js-build', 'browsersync-reload', done);
    }

    done();
});

/*------------------------------------------------------------------
    Task: jekyll-change
    Desription: triggered when HTML/Markedown/Images file(s) are
        changed in the source directory, calls jekyll-build, 
        then browsersync-reload, then lets the watch know it's
        complete
-------------------------------------------------------------------*/
_gulp.task('jekyll-change', function (done) {

    if (!_jekyllBuildInProgress) {
        _gulpUtil.log('Gulp: HTML change(s) detected');
        return _runSequence('jekyll-build', 'browsersync-reload', done);
    }

    done();
});

/*------------------------------------------------------------------
    Task: browsersync-serve
    Desription: builds site in /_site dir using jekyll, then
        initializes browsersync
-------------------------------------------------------------------*/
_gulp.task('browsersync-serve', ['jekyll-build'], function (done) {

    _browserSync.init({
        server: {
            baseDir: './_site'
        }
    });
    done();
});

/*------------------------------------------------------------------
    Task: browsersync-exit
    Desription: exits an existing browsersync process
-------------------------------------------------------------------*/
_gulp.task('browsersync-exit', function (done) {
    
    if(_browserSync.active)
        _browserSync.exit();

    done();
});

/*------------------------------------------------------------------
    Task: browsersync-reload
    Desription: reloads an existing browsersync process
-------------------------------------------------------------------*/
_gulp.task('browsersync-reload', function (done) {

    if(_browserSync.active)
        _browserSync.reload();

    done();
});

/*------------------------------------------------------------------
    Task: default
    Desription: builds entire site in /_site directory using Jekyll,
        then initializes browsersync. Also establishes watches on
        all source files (files outside /_site directory)
-------------------------------------------------------------------*/
_gulp.task('default', ['browsersync-serve', 'watch'], function () { });
