module.exports = function() {
	Ti.include('lib/q.js')
	Ti.include('lib/underscore-1.4.2.js')
	
	Ti.include('lib/jasmine/jasmine.js')
	Ti.include('lib/jasmine/consoleReporter.js')
	
	var tests = [
		'models/User',
		'models/Group'
	]
	
	tests.forEach(function(test) { Ti.include('tests/'+test+'.js') })
	
	jasmine.getEnv().addReporter(new jasmine.ConsoleReporter(false, 'WARN'))
	jasmine.getEnv().execute()
}