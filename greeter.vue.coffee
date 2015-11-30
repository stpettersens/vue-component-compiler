# coffee-stir:
#include vue-controller.coffee

class GreeterController extends VueController
	
	constructor: ->
		el = '#greeter'
		name = 'greeter'
		services = {
			greeter: new GreeterService
		}
	}

	ready: ->
		services.greeter.greet();

	sayHi:-> 
		ready
}
