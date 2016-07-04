/**
 * Gulpfile for Vue component compiler.
*/

'use strict'

const gulp = require('gulp')
const tsc = require('gulp-typescript')
const replace = require('gulp-replace')
const insert = require('gulp-insert')
const mocha = require('gulp-mocha')
const wait = require('gulp-wait')
const clean = require('gulp-rimraf')
const sequence = require('gulp-sequence')
const _exec = require('child_process').exec

const header = [ '/*', 'Vue component compiler.',
'Unoffical "compiler" for Vue.js components written in a class-based style.', '',
'Copyright 2015-2016 Sam Saint-Pettersen.', '',
'Released under the MIT License.', '*/', '' ]

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

gulp.task('test1', function () {
  _exec('node cli.js examples/typescript/greeter.vue.ts greeter.ts', function () {})
  return gulp.src('package.json')
  .pipe(wait(2000))
})

gulp.task('test2', function () {
  return gulp.src('vuecc.test.js', {read: false})
  .pipe(mocha({reporter: 'min'}))
})

gulp.task('clean', function () {
  return gulp.src(['cli.js', 'vuecc.js', 'greeter.ts'])
  .pipe(clean())
})

gulp.task('default', ['core', 'bin'], function () {})
gulp.task('test', sequence('test1', 'test2'))
