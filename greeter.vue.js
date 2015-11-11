// Greeter Vue component in ECMAScript 6.

class Greeter extends VueComponent {
	constructor() {
		super()
		this.config = {
			el: '#greeter',
			data: {
				name: 'Sam'
			}
		}	
	}

	ready() {
		console.log(`Hello, ${name}.`)
	}
}
