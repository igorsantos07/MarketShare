/*
 * TODO: this is only a placeholder until we can securely assure the user has already logged in before
 */
var hasUserCredentials = false,
	initialWindow = "ui/common/windows/"+((hasUserCredentials)? "home" : "login"),
	win = require(initialWindow)

new win().open()