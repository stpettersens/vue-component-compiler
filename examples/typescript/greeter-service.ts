/// <reference path="service.ts" />

class GreeterService extends Service {

	constructor() {
		super('GreeterService');
	}

	public greet(): void {
		alert('Hello, there!');
	}
}
