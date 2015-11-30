# coffee-stir:
#include service.coffee

class GreeterService extends Service

	constructor: ->
		super 'GreeterService'

	greet: void {
		alert 'Hello, there!'

