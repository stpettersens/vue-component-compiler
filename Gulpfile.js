var gulp = require('gulp'),
     tsc = require('gulp-typescript')
  rename = require('gulp-rename'),
  insert = require('gulp-insert');

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
    //.pipe(insert.prepend(header))
    .pipe(insert.prepend('#!/usr/bin/env node\n'))
    .pipe(gulp.dest('.'))
    .pipe(rename('vuecc'))
    .pipe(gulp.dest('.'));
});

 gulp.task('default', ['lib', 'bin'], function(){});
