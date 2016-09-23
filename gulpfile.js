(function(gulp, gulpLoadPlugins) {
  'use strict';
  var $ = gulpLoadPlugins({
      pattern: '*',
      lazy: true,
      rename: {
        'gulp-jshint': 'gjshint',
        'gulp-inline-base64': 'b64'
      }
    }),
    _ = {
      app: 'app',
      dist: 'dist',
      scss: 'scss',
      js: 'app/js',
      css: 'app/css'
    };

  function handleError(error) {
    console.log(error.message);
    this.emit('end');
  }

  //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //| ~ jshint - js files test
  //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  gulp.task('jshint', function() {
    return gulp.src(['gulpfile.js', _.js + '/**/*.js'])
      .pipe($.gjshint('.jshintrc'))
      .pipe($.gjshint.reporter('jshint-stylish'));
  });

  //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //| ~ jshint - js files test
  //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  gulp.task('nodejshint', function() {
    return gulp.src(['app.js', _.node + '/**/*.js'])
      .pipe($.gjshint('.jshintrc'))
      .pipe($.gjshint.reporter('jshint-stylish'));
  });

  //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //| ~ scsslint - scss files test
  //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  gulp.task('scsslint', function() {
    return gulp.src([
        _.scss + '/**/*.scss',
        '!' + _.scss + '/base/_normalize.scss',
        '!' + _.scss + '/base/_reset.scss',
        '!' + _.scss + '/utils/_variables.scss'
      ])
      .pipe($.scssLint({
        'config': '.scsslintrc',
        'customReport': $.scssLintStylish
      }));
  });


  //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //| ~ scss2css (node-sass)
  //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  gulp.task('scss', function() {
    return gulp.src(_.scss + '/**/*.scss')
      .pipe($.plumber({
        errorHandler: handleError
      }))
      .pipe($.sass({
        outputStyle: 'expanded'
      }))
      .pipe($.autoprefixer(['last 15 versions', '> 5%']))
      .pipe(gulp.dest(_.css));
  });

  //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //| ~ clean dist folder
  //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  gulp.task('clean', function() {
    return $.del([_.dist]);
  });

  //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //| ~ copy flexible folder
  //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  gulp.task('cpflexible', function() {
    return gulp.src('web/scripts/flexible/*.*')
      .pipe(gulp.dest('dist/scripts/flexible'));
  });

  //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //| ~ copy static folder
  //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  gulp.task('cpstatic', function() {
    return gulp.src('app/images/**/*.*')
      .pipe(gulp.dest('dist/images'));
  });

  //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //| ~ watch
  //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  gulp.task('watch', ['scss'], function() {
    // Watch scss files
    gulp.watch(_.scss + '/**/*.scss', ['scss']);
  });



}(require('gulp'), require('gulp-load-plugins')));
