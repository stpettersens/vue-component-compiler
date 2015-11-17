/*
 Run tests for vuecc.
*/
var vuecc = require('./vuecc-lib'),
   should = require('should'),
     glob = require('glob');

describe('Test vuecc utility', function() {

	it('Generate component -> greeter.ts', function(done) {
		new VueComponentCompiler('greeter.vue.ts', 'greeter.ts', 
		"['typings/vue/vue.d.ts','greeter-service.ts']");
		var files = glob.sync('greeter.ts');
		files[0].should.be.equal('greeter.ts').and.be.a.String;
		done();
	});

	it('Generate component -> greeter.js', function(done) {
		new VueComponentCompiler('greeter.vue.ts', 'greeter.ts');
		var files = glob.sync('greeter.js');
		files[0].should.be.equal('greeter.js').and.be.a.String;
		done();
	});
});
