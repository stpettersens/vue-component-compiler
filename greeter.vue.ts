/// <reference path="vue-controller.ts" />
/// <reference path="greeter-service.ts" />

class GreeterController extends VueController {
	
	constructor() {
		super();
		this.el = '#greeter';
		this.services = {
			greeter: new GreeterService()
		};
	}

	public ready(): void {
		this.services.greeter.greet();
	};

	private sayHi(): void {
		this.ready();
	};
}
