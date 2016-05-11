/**
 * Gulpfile for Vue component compiler.
*/

'use strict'

const gulp = require('gulp'),
       tsc = require('gulp-typescript'),
    rename = require('gulp-rename'),
    insert = require('gulp-insert');

let header = [ '/*','Vue component compiler.',
'Unoffical "compiler" for Vue.js components written in a class-based style.','',
'Copyright 2015-2016 Sam Saint-Pettersen.','','Released under the MIT License.','*/','' ];

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

gulp.task('default', ['lib', 'bin'], function(){});
