class GreeterController extends VueController
	
	constructor: ->
		@el = '#greeter'
		@name = 'greeter'
		@services = {
			greeter: new GreeterService
		}
		#! ## Please use #! to end a method block and ## for comments.

	ready: ->
		## Please use () for method calls.
		@services.greeter.greet() 
		#!

	sayHi: -> 
		@ready()
		#!
