abstract class Service {

	private debug: boolean = true;
	
	constructor(name: string) {
		if(this.debug) 
			console.log(`Initialized ${name}...`);
	}
}
