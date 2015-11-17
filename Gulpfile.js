/**
 * Gulpfile for Vue component compiler.
*/
var gulp = require('gulp'),
     tsc = require('gulp-typescript')
  rename = require('gulp-rename'),
  insert = require('gulp-insert'),
   _exec = require('child_process').exec;

var header = [ '/*','Vue component compiler.',
'Unoffical "compiler" for Vue.js components written in a class-based style.','',
'Copyright 2015 Sam Saint-Pettersen.','','Released under the MIT License.','*/','' ];

gulp.task('typings', function() {
  _exec('tsd install', function() {});
});

gulp.task('lib', function() {
 	return gulp.src('vuecc-lib.ts')
 	.pipe(tsc({
 		module: 'commonjs',

 		removeComments: true
 	}))
 	.pipe(gulp.dest('.'))
 });

gulp.task('bin', function() {
    return gulp.src('vuecc.ts')
    .pipe(tsc({
    	module: 'commonjs',
    	removeComments: true
    }))
    .pipe(insert.prepend(header.join('\n')))
    .pipe(insert.prepend('#!/usr/bin/env node\n'))
    .pipe(gulp.dest('.'))
    .pipe(rename('vuecc'))
    .pipe(gulp.dest('.'));
});

gulp.task('install', ['default'], function() {
    _exec('npm pack', function(stderr, stdout) {
      console.log('Packaged: %s', stdout);
    });
    _exec('npm install -g vue-component-compiler-0.0.1.tgz', function(stderr, stdout) {
      console.log('Installed: %s', stdout);
    });
});

gulp.task('default', ['lib', 'bin'], function(){});
