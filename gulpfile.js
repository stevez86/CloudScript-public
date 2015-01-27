// include gulp
var gulp = require('gulp');

// include plug-ins
var jshint = require('gulp-jshint');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var autoprefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var minifyHTML = require('gulp-minify-html');

gulp.task('jshint', function() {
  gulp.src(['./src/public/dev/javascripts/app.js', './src/public/dev/javascripts/services/*.js', './src/public/dev/javascripts/routes/*.js', './src/public/dev/javascripts/factories/*.js', './src/public/dev/javascripts/directives/*.js', './src/public/dev/javascripts/controllers/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('imagemin', function() {
  var imgSrc = './src/public/dev/img/*',
      imgDst = './src/public/img/';

  gulp.src(imgSrc)
    .pipe(changed(imgDst))
    .pipe(imagemin())
    .pipe(gulp.dest(imgDst));
});

gulp.task('htmlpage', function() {
  var htmlSrc = './src/public/dev/**/*.html',
      htmlDst = './src/public/';

  gulp.src(htmlSrc)
    .pipe(changed(htmlDst))
    .pipe(minifyHTML())
    .pipe(gulp.dest(htmlDst));
});

gulp.task('scripts', function() {
  gulp.src(['./src/public/dev/javascripts/services/*.js', './src/public/dev/javascripts/routes/*.js', './src/public/dev/javascripts/factories/*.js', './src/public/dev/javascripts/directives/*.js', './src/public/dev/javascripts/controllers/*.js'])
    .pipe(concat('script.js'))
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest('./src/public/javascripts/'));
});

gulp.task('vendorScripts', function() {
  gulp.src('./src/public/dev/javascripts/vendor/*.js')
    .pipe(concat('vendor.js'))
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest('./src/public/javascripts/'));
});

gulp.task('appScript', function() {
  gulp.src('./src/public/dev/javascripts/app.js')
    .pipe(concat('app.js'))
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest('./src/public/javascripts/'));
});

gulp.task('styles', function() {
  gulp.src('./src/public/dev/stylesheets/*.css')
    .pipe(concat('styles.css'))
    .pipe(autoprefix('last 2 versions'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./src/public/stylesheets/'));
});

gulp.task('default', ['imagemin', 'htmlpage', 'scripts', 'vendorScripts', 'appScript', 'styles'], function() {});

gulp.task('watch', function() {
  // watch for HTML changes
  gulp.watch('./src/public/dev/**/*.html', function() {
    gulp.run('htmlpage');
  });

  // watch for JS changes
  gulp.watch(['./src/public/dev/javascripts/app.js', './src/public/dev/javascripts/services/*.js', './src/public/dev/javascripts/routes/*.js', './src/public/dev/javascripts/factories/*.js', './src/public/dev/javascripts/directives/*.js', './src/public/dev/javascripts/controllers/*.js'], function() {
    gulp.run('jshint', 'scripts', 'appScript');
  });

  // watch for CSS changes
  gulp.watch('./src/public/stylesheets/*.css', function() {
    gulp.run('styles');
  });
});