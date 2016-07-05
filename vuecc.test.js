/*
 Run tests for vuecc.
*/

/* global describe it */
'use strict'

const assert = require('chai').assert
const glob = require('glob')
const fs = require('fs')

describe('Test vue component compiler:', function () {
  it('Generated component -> greeter.ts via command line', function (done) {
    const files = glob.sync('greeter.ts')
    assert.equal(files[0], 'greeter.ts')
    assert.equal(fs.existsSync('greeter.ts'), true)
    done()
  })
  it('Generated component -> greeter.js via command line', function (done) {
    const files = glob.sync('greeter.js')
    assert.equal(files[0], 'greeter.js')
    assert.equal(fs.existsSync('greeter.js'), true)
    done()
  })
})
