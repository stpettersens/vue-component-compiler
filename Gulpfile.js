/**
 * Gulpfile for Vue component compiler.
*/

'use strict'

const gulp = require('gulp')
const tsc = require('gulp-typescript')
const replace = require('gulp-replace')
const insert = require('gulp-insert')
const mocha = require('gulp-mocha')
const _exec = require('child_process').exec

let header = [ '/*','Vue component compiler.',
'Unoffical "compiler" for Vue.js components written in a class-based style.','',
'Copyright 2015-2016 Sam Saint-Pettersen.','','Released under the MIT License.','*/','' ]

gulp.task('core', function () {
 	return gulp.src('vuecc.ts')
 	.pipe(tsc({
 		module: 'commonjs',
    target: 'ES5',
 		removeComments: true
 	}))
  .pipe(insert.prepend(header.join('\n')))
 	.pipe(gulp.dest('.'))
 })

gulp.task('bin', function () {
  return gulp.src('cli.ts')
  .pipe(tsc({
    module: 'commonjs',
    target: 'ES5',
    removeComments: true
  }))
  .pipe(insert.prepend(header.join('\n')))
  .pipe(insert.prepend('#!/usr/bin/env node\n'))
  .pipe(replace(/(.\/vuecc)/g, '$1.js'))
  .pipe(gulp.dest('.'))
})

gulp.task('test', function () {
  _exec('node vuecc examples/typescript/greeter.vue.ts greeter.ts', function (){})
  return gulp.src('vuecc.test.js', {read: false})
  .pipe(mocha({reporter: 'min'}))
})

gulp.task('default', ['core', 'bin'], function (){})
