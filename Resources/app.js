// Importing some basic dependencies for the project
require ("lib/date")
var _ = require("lib/underscore")

/*
 * TODO: this is only a placeholder until we can securely assure the user has already logged in before
 */
var hasUserCredentials = false,
	initialWindow = "ui/common/windows/"+((hasUserCredentials)? "home" : "login")

require(initialWindow).open()