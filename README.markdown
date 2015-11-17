### Vue component compiler
<!--[![Build Status](https://travis-ci.org/stpettersens/dt-init.png?branch=master)](https://travis-ci.org/stpettersens/dt-init)
[![npm version](https://badge.fury.io/js/dt-init.svg)](http://npmjs.org/package/dt-init)
[![Dependency Status](https://david-dm.org/stpettersens/dt-init.png?theme=shields.io)](https://david-dm.org/stpettersens/dt-init) [![Development Dependency Status](https://david-dm.org/stpettersens/dt-init/dev-status.png?theme=shields.io)](https://david-dm.org/stpettersens/dt-init#info=devDependencies)-->

> :bulb: Unoffical "compiler" for Vue.js components written in a class-based style.

This compiler allows you to write components like so:

```ts
// Greeter Vue instance in TypeScript

/// <reference path="vue-instance.ts" />

class Greeter extends VueInstance {
	constructor() {
		super();
		this.el = '#greeter';
		this.data = {
		    name: 'Sam'
		};
	}

	public ready(): void {
		this.sayHi();
	};

	private sayHi(): void {
		console.log(`Hi, ${name}.`);
	};
}
```

##### Install:

`npm install -g vue-component-compiler`

##### Usage: 

```
Usage: vuecc input output [['reference']][-q|--quiet][-n|--no-colors]
[-c|--no-header][-h|--help|-v|--version]

 input              : Class-based component as input (e.g. component.vue.ts)
 output             : new Vue() formatted component as output (e.g. component.ts)
 ['reference']      : Reference path include(s) (TypeScript).
 -q | --quiet       : Be less verbose (only error output).
 -n | --no-colors   : Don't use colorful output.
 -c | --no-header   : Don't generate commented header for output.
 -h | --help        : Display this usage information and exit.
 -v | --version     : Display application version and exit.
 ```

##### Using Gulp or Grunt?

:tropical_drink: [gulp-vuecc](http://github.com/stpettersens/gulp-vuecc)
:boar: [grunt-vuecc](http://github.com/stpettersens/grunt-vuecc)
