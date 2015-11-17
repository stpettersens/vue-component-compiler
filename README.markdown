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

`vuecc component.vue.ts component.ts`

##### Using Gulp or Grunt?

:tropical_drink: [gulp-vuecc](http://github.com/stpettersens/gulp-vuecc)
:boar: [grunt-vuecc](http://github.com/stpettersens/grunt-vuecc)
