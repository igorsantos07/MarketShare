module.exports = function() {
	var ui = require("ui/common/components/defaults"),
		spacing = 10,
		lightGray = '#8A8785'
	
	var win = ui.createWindow('loginWindow', { navBarHidden: false })
	
	var container = Ti.UI.createScrollView()
		var loginBox = Ti.UI.createView({ width: '80%', layout: 'vertical' })
			
			var email = ui.createTextField({ keyboardType: Ti.UI.KEYBOARD_EMAIL })
			loginBox.add(ui.createFieldLabel({ textid: 'email', top: spacing * 2 }))
			loginBox.add(email)
			
			var password = ui.createTextField({ passwordMask: true })
			loginBox.add(ui.createFieldLabel({ textid: 'password', top: spacing }))
			loginBox.add(password)
			
			var btnLogin = ui.createButton({
				top: 20,
				width: '100%',
				titleid: 'login'
			})
			loginBox.add(btnLogin)
			
			var newAccountBox = Ti.UI.createView({
				layout: 'horizontal',
				top: 30,
				right: 0,
				bottom: 30
			})
			
				newAccountBox.add(ui.createLabel({
					textid: 'neverUsed',
					width: '45%',
					right: 10,
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
		var newAccount = new require('ui/common/windows/initial/newAccount')()
		newAccount.open()
	})
	
	return win
}