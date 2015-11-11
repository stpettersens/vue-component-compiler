### VueComponent compiler
<!--[![Build Status](https://travis-ci.org/stpettersens/dt-init.png?branch=master)](https://travis-ci.org/stpettersens/dt-init)
[![npm version](https://badge.fury.io/js/dt-init.svg)](http://npmjs.org/package/dt-init)
[![Dependency Status](https://david-dm.org/stpettersens/dt-init.png?theme=shields.io)](https://david-dm.org/stpettersens/dt-init) [![Development Dependency Status](https://david-dm.org/stpettersens/dt-init/dev-status.png?theme=shields.io)](https://david-dm.org/stpettersens/dt-init#info=devDependencies)-->

> Unoffical "compiler" for Vue.js components written in a class-based style.

This compiler allows you to write components like so:

```ts
// Greeter Vue component in TypeScript

/// <reference path="includes/vue-component.ts" />

class Greeter extends VueComponent {
	constructor() {
		super();
		this.config = {
			el: '#greeter',
			data: {
				name: 'Sam'
			}//
		};
	}

	public ready(): void {
		this.sayHi();
	}//

	private sayHi(): void {
		console.log(`Hi, ${name}.`);
	}//
}
```

Install: `npm install -g vue-component-compiler`

Usage: `vuecc component.vue.ts component.ts`
