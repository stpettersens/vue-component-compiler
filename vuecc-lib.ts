/*
	Vue component compiler.
	Unoffical "compiler" for Vue.js components written in a class-based style.

	Copyright 2015 Sam Saint-Pettersen.

	Released under the MIT License.
*/

/// <reference path="typings/node/node.d.ts" />
/// <reference path="typings/line-reader/line-reader.d.ts" />
/// <reference path="typings/chalk/chalk.d.ts" />
/// <reference path="typings/generic-functions/generic-functions.d.ts" />

import fs = require('fs');
import lr = require('line-reader');
import chalk = require('chalk');
import g = require('generic-functions');

class VueComponentCompiler {

	private version: string;
	private colors: boolean;
	private verbose: boolean;
	private header: boolean;
	private references: string[];
	private input: string;
	private output: string;
	private type: string;

	/**
	 * Print an error message.
	 * @param message Error message to print.
	*/
	private printError(message: string): void {
		if (this.colors) {
			console.log(chalk.bold.red(message));
		}
		else console.log(message);
	}

	/**
	 * Print an information message.
	 * @param message Informatiom message to print.
	*/
	private printInfo(message: string): void {
		if (this.colors) {
			console.log(chalk.gray(message));
		}
		else console.log(message);
	}

	/**
	 * Highlight some text.
	 * @param text Text to highlight.
	 * @returns Hilighted text.
	*/
	private hilight(text: string): any {
		if (this.colors) {
			return chalk.yellow(text);
		}
		return text;
	}

	/**
 	 * Some text to embolden.
 	 * @param text Text to embolden.
 	 * @returns Bold text.
	*/
	private embolden(text: string): any {
	        if (this.colors) {
	            return chalk.bold.white(text);
	        }
	        return text;
	}
	
	/**
	 * Display help information and exit.
	*/
	private displayHelp(): void {
		this.printInfo('Utility to compile class-based Vue components.');
		this.printInfo(`Copyright 2015-2016 Sam Saint-Pettersen ${this.hilight('[MIT License].')}`)
		console.log(`\nUsage: ${this.embolden('vuecc')} input output [[\'reference\']][-t|--type][-q|--quiet][-n|--no-colors]`);
		console.log('[-c|--no-header][-h|--help|-v|--version]');
		console.log('\n input              : Class-based component as input (e.g. component.vue.ts)');
		console.log(' output             : new Vue() formatted component as output (e.g. component.ts)');
		console.log(' [\'reference\']      : Reference path include(s) (TypeScript).');
		console.log(' -t | --type        : Specify language input (coffee, ts, js).');
		console.log(' -q | --quiet       : Be less verbose (only error output).');
		console.log(' -c | --no-colors   : Don\'t use colorful output.');
		console.log(' -n | --no-header   : Don\'t generate commented header for output.');
		console.log(' -h | --help        : Display this usage information and exit.');
		console.log(' -v | --version     : Display application version and exit.');
	}

	/**
	 * Display version and exit.
	*/
	private displayVersion(): void {
		this.printInfo('vuecc v. ' + this.version);
		process.exit(0);
	}
	
	/**
	 * Compile the output.
	*/
	private compile(): void {
		var in_method: boolean = false;
		var in_data: boolean = false;
		var in_services: boolean = false;
		var c_method: string = null;
		var className: string = null
		var el: string = null;
		var name: string = null;
		var data = new Array<string>();
		var services = new Array<string>();
		var methods = new Array<string>();
		var signatures = new Array<string>();
		var methodsImpl = new Array<string>();
		var lines = new Array<string>();

		var iext: string = g.endswithdot(this.input);
		var oext: string = g.endswithdot(this.output);
		var header: boolean = this.header;
		var references: string[] = this.references;
		var output: string = this.output;

		if(this.type !== null) iext = '.' + this.type;

		lr.eachLine(this.input, function(line: string, last: boolean) {

			//console.log(line);
			if (!in_method && !in_data && !in_services) {

				var m: RegExpMatchArray = line.match(/class\s(.*)\sextends\sVue.*/);
				if (m != null) className = m[1];

				line = line.replace(/(\s*)@(.*)/, '$1this.$2');

				if (iext === '.coffee')
					m = line.match(/this\.el\s\=(.*)/);
				else
					m = line.match(/this\.el\s\=(.*);/);
				if (m !== null) el = m[1];

				if (iext ==='.coffee')
					m = line.match(/this\.name\s\=(.*)/);
				else
					m = line.match(/this\.name\s\=(.*);/);
				if (m !== null) name = m[1].replace(/'|"|\s/g, '');

				if (iext === '.ts' || iext === '.js')
					m = line.match(/(?:public|private|protected)\s*(.*)\((.*)\)/);
				else
					m = line.match(/(.*)\:\s*\(*(.*)\)*\s\-\>/);

				if (m !== null && m[1].indexOf('constructor') === -1) {
					methods.push(m[1]);
					if (m[2] !== null) signatures.push(m[2].replace(')', ''));
					else this.signatures.push('');
					c_method = m[1];
					in_method = true;
				}

				m = line.match(/(this.data\s=\s{)/);
				if (m !== null) in_data = true;

				m = line.match(/(this.services\s=\s{)/);
				if (m !== null) in_services = true;
			}
			else if(in_method) {
				if (iext === '.ts' || iext === '.js'){
					m = line.match(/(\};)/);
				}
				else if(iext === '.coffee') {
					m = line.match(/(#!)/);

					line = line.replace('#!', '');
					line = line.replace(/(\s*)@(.*)/, '$1$2');
					
					var element = line.match(/this.el\s\=(.*)/);
					if (element !== null) el = element[1];

					var scope = line.match(/this.name\s\=(.*)/);
					if (scope !== null) name = scope[1].replace(/'|"|\s/g, '');
				}

				if (m != null) in_method = false;
				m = line.match(/(.*)/);
				if (m != null) {
					methodsImpl.push(c_method + '-->' + m[1]);
				}
			}
			else if(in_data) {
				if (iext === '.coffee')
					m = line.match(/(\})/);
				else
					m = line.match(/(\});/);

				if (m != null) in_data = false;
				m = line.match(/(.*)/);
				if (m != null) {
					data.push(m[1]);
				}
			}
			else if(in_services) {
				if (iext === '.coffee')
					m = line.match(/(\})/);
				else
					m = line.match(/(\});/);

				if (m != null) in_services = false;
				m = line.match(/(.*)/);
				if (m != null) {
					services.push(m[1]);
				}
			}

			if(last) {

				if(header) {
					lines.push('// ********************************************************************');
					lines.push(`// ${className}`);
					lines.push(`// Generated at ${new Date().toISOString()} by Vue component compiler.`);
					lines.push(lines[0]);
				}
				if(oext === '.ts') {
					if(references.length == 0) 
						lines.push('/// <reference path="typings/vue/vue.d.ts" />\n');

					references.map(function(reference: string) {
						lines.push(`/// <reference path="${reference}" />`);
					});
				}
				if(name !== null) {
					lines.push(`var ${name} = null;`);
				}
				if(services.length > 0) {
					lines.push('var services = {');
					services.map(function(service: string) {
						service = '\t' + service.replace(/^\s*/g, '');
						service = service.replace(/\};/, '');
						service = service.replace(/\}/, '');
						lines.push(service);
					});
					lines.push('};');
				}
				lines.push('window.onload = function() {')
				if(name !== null) {
					lines.push(`\t${name} = new Vue({`);
				}
				else
					lines.push('\tnew Vue({');

				lines.push(`\t\tel: ${el},`);
				lines.push('\t\tdata: {');
				data.map(function(datum: string) {
					datum = datum.replace(/\};/, '}');
					datum = datum.replace('}', '}');
					lines.push(datum);
				});
				lines.push('\t\t, ready: function() {');
				methodsImpl.map(function(impl: string) {
					if (impl.indexOf(methods[0] + '-->') != -1) {
						impl = impl.replace('};', '');
						impl = impl.replace('this.services', 'services');
						var fl = impl.split('-->');
						if (fl[1].length > 0) lines.push('\t' + fl[1]);
					}
				});
				lines.push('\t\t},');
				lines.push('\t\tmethods: {');
				methods.splice(0, 1);
				signatures.splice(0, 1);
				for (var i = 0; i < methods.length; i++) {
					if (iext === '.coffee') methods[i] = methods[i].replace('\t', ''); 
					if (signatures[i] === undefined) signatures[i] = '';
					lines.push(`\t\t\t${methods[i]}: function(${signatures[i]}) {`);
					methodsImpl.map(function(impl) {
						if (impl.indexOf(methods[i] + '-->') != -1) {
							impl = impl.replace('};', '');
							impl = impl.replace('this.services', 'services');
							var fl = impl.split('-->');
							if (fl[1].length > 0) lines.push('\t\t' + fl[1]);
						}
					});
					if (i < methods.length - 1) lines.push('\t\t\t},')
					else lines.push('\t\t\t}');
				}
				lines.push('\t\t}');
				lines.push('\t});\n};\n')

				function isNotEmptyLine(line: string) {
					if (/^\s*\t*$/.test(line) == false)
						return true;
					return false;
				}

				lines = lines.filter(isNotEmptyLine);
				if(iext === '.coffee')
					lines = lines.map(function(line) { return line.replace('##', '//') });
				fs.writeFileSync(output, lines.join('\n'));
				return false;
			}
    	});
    }

    /**
     * VueComponentCompiler implements functionality of vuecc program.
     * @constructor
     * @param input Class-based component to compile.
     * @param output new Vue() formatted component.
     * @param option An option (e.g. --quiet switch option).
     * @param another Another option (e.g. --no-colors switch option).
     * @param yao Yet another option (e.g. ['typings/vue/vue.d.ts'])
    */
	constructor(input: string, output: string, options: string[]), // option?: string, another?: string, yao?: string) {

		this.version = '0.7';
		this.colors = true;
		this.verbose = true;
		this.header = true;
		this.references = new Array<string>();
		this.input = input;
		this.output = output;
		this.type = null;
		
		options.map(function (opt) {
			if (opt == '-q' || option == '--quiet') {
				this.verbose = false;
			}
			
			if (opt =='c' || option == '--no-colors') {
				this.colors = false;
			}
			
			if (opt == '-n' || option == '--no-header') {
				this.header = false;
			}
		});

		/*if (option == '-q' || option == '--quiet'
			|| another == '-q' || another == '--quiet'
			|| yao == '-q' || yao == '--quiet')
			this.verbose = false;

		if (option == '-c' || option == '--no-colors'
			|| another == '-c' || another == '--no-colors'
			|| yao == '-c' || yao == '--no-colors')
			this.colors = false;

		if (option == '-n' || option == '--no-header'
			|| another == '-n' || another == '--no-header'
			|| yao == '-n' || yao == '--no-header')
			this.header = false;

		if (option == '-t' || option == '--type')
			this.type = another;

		else if (another == '-t' || another == '--type')
			this.type = yao;

		if (option != null && option.charAt(0) == '[') {
			this.references = JSON.parse(option.replace(/'/g, '"'));
		}
		else if (another != null && another.charAt(0) == '[') {
			this.references = JSON.parse(another.replace(/'/g, '"'));
		}
		else if (yao != null && yao.charAt(0) == '[') {
			this.references = JSON.parse(yao.replace(/'/g, '"'));
		}

		if(input == '-h' || input == '--help') {
			this.displayHelp();
			process.exit(0);
		}
		else if(input == '-v' || input == '--version') {
			this.displayVersion();
		}
		if(input == null || input.charAt(0) == '-') {
			this.printError('Please specify a valid input file.\n');
			this.displayHelp();
			process.exit(1);
		}
		else if(output == null || output.charAt(0) == '-') {
			this.printError('Please specify a valid output file.\n');
			this.displayHelp();
			process.exit(1);
		}
		if(this.verbose) 
			this.printInfo(`Compiling Vue component: ${this.embolden(input)}`);*/

		this.compile();
	}
}
export = VueComponentCompiler;
