/*
 Run tests for vuecc.
*/

'use strict'

const VueComponentCompiler = require('./vuecc-lib')
const should = require('should')
const glob = require('glob')
const fs = require('fs')

it('Generated component -> greeter.ts', function (done) {
	var files = glob.sync('greeter.ts')
	files[0].should.equal('greeter.ts').and.be.a.String
	if(fs.exists('greeter.ts')) fs.unlinkSync(files[0])
	done()
})
