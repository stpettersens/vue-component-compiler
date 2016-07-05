### Vue component compiler by [@stpettersens](https://github.com/stpettersens)

> :mount_fuji: Unoffical "compiler" for Vue.js components written in a class-based style.

[![Build Status](https://travis-ci.org/stpettersens/vue-component-compiler.png?branch=master)](https://travis-ci.org/stpettersens/vue-component-compiler)
[![Build status](https://ci.appveyor.com/api/projects/status/8069glp56dcrma9t?svg=true)](https://ci.appveyor.com/project/stpettersens/vue-component-compiler)
[![npm version](https://badge.fury.io/js/vuecc-compiler.svg)](http://npmjs.org/package/vuecc-compiler)
[![Dependency Status](https://david-dm.org/stpettersens/vue-component-compiler.png?theme=shields.io)](https://david-dm.org/stpettersens/vue-component-compiler) [![Development Dependency Status](https://david-dm.org/stpettersens/vue-component-compiler/dev-status.png?theme=shields.io)](https://david-dm.org/stpettersens/vue-component-compiler#info=devDependencies)

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

##### Install as module:

`npm install vuecc-compiler`

##### Usage as module:

```js
'use strict'
const vuecc = require('vuecc-compiler')

const options = { verbose: true }
vuecc.invoke('input.ts', 'output.ts', options)
```

##### Install as command:

`npm install -g vuecc-compiler` for the `vuecc` command.

##### Usage as command:

```
Usage: vuecc input output [['reference']][-t type][-q|--quiet][-c|--no-colors]
[-n|--no-header][-h|--help|-v|--version]

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
