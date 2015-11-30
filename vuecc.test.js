/*
 Run tests for vuecc.
*/
var VueComponentCompiler = require('./vuecc-lib'),
   should = require('should'),
     glob = require('glob'),
       fs = require('fs');

it('Generated component -> greeter.ts', function(done) {
	var files = glob.sync('greeter.ts');
	files[0].should.be.a.String.and.equal('greeter.ts');
	if(fs.exists('greeter.ts')) fs.unlinkSync(files[0]);
	done();
});
