/*
	Vue component compiler.
	Unoffical "compiler" for Vue.js components written in a class-based style.

	Copyright 2015-2016 Sam Saint-Pettersen.

	Released under the MIT License.
*/

import VueComponentCompiler = require('./vuecc');
new VueComponentCompiler(process.argv[1], process.argv[2], process.argv[3], process.argv);
