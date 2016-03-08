'use strict';

var gulp = require('gulp'),
		del = require('del'),
		sass = require('gulp-sass'),
		minifycss = require('gulp-clean-css'),
		jshint = require('gulp-jshint'),
		uglify = require('gulp-uglify'),
		ngannotate = require('gulp-ng-annotate'),
		useref = require('gulp-useref'),
		gulpif = require('gulp-if'),
		wiredep = require('wiredep').stream,
		replace = require('gulp-replace'),
		htmlmin = require('gulp-htmlmin'),
		connect = require('gulp-connect');


// Default
gulp.task('default', ['build'], function () {});


// Build
gulp.task('build', ['clear', 'html:build'], function () {
	// Clear temp folder
	return del.sync('temp');
});


// Serve
gulp.task('serve', ['clear:temp', 'sass', 'js', 'html:serve', 'watch'], function () {
  connect.server({
  	root: 'temp',
  	port: 8000,
  	livereload: true,
  	middleware: function (connect) {
			return [connect().use('/bower_components', connect.static('bower_components'))];
    }
  });
});


// Watch
gulp.task('watch', function () {
	gulp.watch('app/**/*.sass', ['sass']);
	gulp.watch('app/**/*.js', ['js']);
	gulp.watch('app/**/*.html', ['html:serve']);
});


// Clear
gulp.task('clear', ['clear:temp', 'clear:dist']);
gulp.task('clear:temp', function () {
	return del.sync('temp');
});
gulp.task('clear:dist', function () {
	return del.sync('dist');
});


// CSS
gulp.task('sass', function () {
  return gulp.src('app/**/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('temp'))
    .pipe(connect.reload());
});


// JS
gulp.task('js:build', ['js'], function () {
	return gulp.src('temp/**/*.js')
		.pipe(replace('http://localhost:7000', ''))
		.pipe(gulp.dest('temp'));
});
gulp.task('js', ['ngannotate'], function () {
	return gulp.src('temp/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(connect.reload());
});
gulp.task('ngannotate', function () {
	return gulp.src('app/**/*.js')
		.pipe(ngannotate())
		.pipe(gulp.dest('temp'));
});


// HTML
gulp.task('html:build', ['html:useref'], function () {
	return gulp.src(['dist/**/*.html'])
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest('dist'));
});
gulp.task('html:useref', ['sass', 'js:build', 'html:serve'], function () {
	return gulp.src(['temp/**/*.html'])
		.pipe(useref())
		.pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.css', minifycss({ keepSpecialComments: 0 })))
    .pipe(gulp.dest('dist'));
});
gulp.task('html:serve', ['html:bower'], function () {
  return gulp.src(['app/**/*.html', '!app/index.html'])
    .pipe(gulp.dest('temp'))
    .pipe(connect.reload());
});
gulp.task('html:bower', function () {
	return gulp.src('app/index.html')
		.pipe(wiredep({ ignorePath: '../../' }))
    .pipe(gulp.dest('temp'));
});
