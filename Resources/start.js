module.exports = function() {
	var hasUserCredentials = Ti.App.Properties.hasProperty('userId'),
		initialWindow = 'ui/common/windows/'+((hasUserCredentials)? 'main/lists' : 'initial/login'),
		win = new require(initialWindow)()
		
	win.open()
}