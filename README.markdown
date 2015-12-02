### Vue component compiler by [@stpettersens](https://github.com/stpettersens)
[![Build Status](https://travis-ci.org/stpettersens/vue-component-compiler.png?branch=master)](https://travis-ci.org/stpettersens/vuecc-component-compiler)
[![npm version](https://badge.fury.io/js/vuecc-compiler.svg)](http://npmjs.org/package/vuecc-compiler)
[![Dependency Status](https://david-dm.org/stpettersens/vue-component-compiler.png?theme=shields.io)](https://david-dm.org/stpettersens/vue-component-compiler) [![Development Dependency Status](https://david-dm.org/stpettersens/vue-component-compiler/dev-status.png?theme=shields.io)](https://david-dm.org/stpettersens/vue-component-compiler#info=devDependencies)

> :mount_fuji: Unoffical "compiler" for Vue.js components written in a class-based style.

This compiler allows you to write components like so:

```ts
// Greeter Vue instance in TypeScript

/// <reference path="vue-instance.ts" />

class Greeter extends VueInstance {
	constructor() {
		super();
		this.el = '#greeter';
		this.name = 'greeter'; // For outside access (e.g. javascript:greeter.sayHi()).
		this.data = {
		    name: 'Sam'
		};
	}

	public ready(): void {
		this.sayHi();
	};

	public sayHi(): void {
		console.log(`Hi, ${name}.`);
	};
}
```

##### Install:

`npm install -g vuecc-compiler` for the `vuecc` command.

##### Usage: 

```
Usage: vuecc input output [['reference']][-t type][-q|--quiet][-n|--no-colors]
[-c|--no-header][-h|--help|-v|--version]

 input              : Class-based component as input (e.g. component.vue.ts)
 output             : new Vue() formatted component as output (e.g. component.ts)
 ['reference']      : Reference path include(s) (TypeScript).
 -t | --type        : Specify language input (coffee, ts, js).
 -q | --quiet       : Be less verbose (only error output).
 -c | --no-colors   : Don't use colorful output.
 -n | --no-header   : Don't generate commented header for output.
 -h | --help        : Display this usage information and exit.
 -v | --version     : Display application version and exit.
 ```

##### Using Gulp or Grunt?

:tropical_drink: [gulp-vuecc](http://github.com/stpettersens/gulp-vuecc)
:boar: [grunt-vuecc](http://github.com/stpettersens/grunt-vuecc)

This utility should not be confused with https://github.com/vuejs/vue-component-compiler
