module.exports = function() {
	var ui = require("ui/common/components/all"),
		_ = require('lib/underscore-1.4.2')._,
		spacing = 10,
		User = require('models/User')
	
	var win = ui.createMainWindow('loginWindow')
	
	var container = Ti.UI.createScrollView()
		var loginBox = Ti.UI.createView({ width: '80%', layout: 'vertical' })
			
			var email = ui.createTextField({ keyboardType: Ti.UI.KEYBOARD_EMAIL })
			loginBox.add(ui.createFieldLabel({ textid: 'email', top: spacing * 2 }))
			loginBox.add(email)
			
			var password = ui.createTextField({ passwordMask: true })
			loginBox.add(ui.createFieldLabel({ textid: 'password', top: spacing }))
			loginBox.add(password)
			
			var btnLogin = ui.createButton({
				top: spacing * 2,
				width: '100%',
				titleid: 'login'
			})
			loginBox.add(btnLogin)
			
			var newAccountBox = Ti.UI.createView({
				layout: 'horizontal',
				top: spacing * 3,
				right: 0
			})
			
				newAccountBox.add(ui.createLabel({
					textid: 'neverUsed',
					width: '55%',
					right: '5%',
					textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
					color: ui.color.text,
					font: { fontSize: 13 }
				}))
				
				var btnNew = ui.createButton({
					titleid: 'newAccount',
					width: '40%',
					right: 0,
					font: { fontSize: 13 }
				})
				newAccountBox.add(btnNew)
				
			loginBox.add(newAccountBox)
		container.add(loginBox)
	win.add(container)

	btnNew.addEventListener('click', function(e) {
		var newAccount = require('ui/common/windows/initial/newAccount')(win)
		newAccount.open()
	})
	
	btnLogin.addEventListener('click', function(e) {
		win.fireEvent('login', { email: email.value, password: password.value })
	})
	
	win.addEventListener('login', function(credentials) {
		var user = new User()
		user.find({ email: email.value, password: Ti.Utils.md5HexDigest(password.value) }, function(user) {
            if (user) {
                //TODO: should save the user ID into an app property (in the file system)
                var home = require('ui/common/windows/main/lists')()
                home.open()
            }
            else {
                alert(L('invalidLogin'))
            }
		})
	})
	
	return win
}