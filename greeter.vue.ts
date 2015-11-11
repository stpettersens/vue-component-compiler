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
		console.log(`Hello, ${name}.`);
	}//
}
