/*
 * TODO: this is only a placeholder until we can securely assure the user has already logged in before
 */
var hasUserCredentials = Ti.App.Properties.hasProperty('userId'),
	initialWindow = 'ui/common/windows/'+((hasUserCredentials)? 'main/lists' : 'initial/login'),
	win = require(initialWindow)
	
new win().open()