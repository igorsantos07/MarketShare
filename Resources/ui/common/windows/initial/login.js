module.exports = function() {
	var ui = require("ui/common/components/all"),
		spacing = 10,
		lightGray = '#8A8785'
	
	var win = ui.createWindow('loginWindow', { navBarHidden: false, exitOnClose: true })
	
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
				right: 0,
				bottom: spacing * 3
			})
			
				newAccountBox.add(ui.createLabel({
					textid: 'neverUsed',
					width: '45%',
					right: spacing,
					textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
					color: lightGray,
					font: { fontSize: 13 }
				}))
				
				var btnNew = ui.createButton({ width: '50%', titleid: 'newAccount' })
				newAccountBox.add(btnNew)
				
			loginBox.add(newAccountBox)
		container.add(loginBox)
	win.add(container)

	btnNew.addEventListener('click', function(e) {
		var newAccount = new require('ui/common/windows/initial/newAccount')(win)
		newAccount.open()
	})
	
	btnLogin.addEventListener('click', function(e) {
		win.fireEvent('login', { email: email.value, password: password.value })
	})
	
	win.addEventListener('login', function(credentials) {
		alert('User: '+credentials.email+'\n'+'Password: '+credentials.password)
		var home = new require('ui/common/windows/main/home')()
		home.open()
	})
	
	return win
}