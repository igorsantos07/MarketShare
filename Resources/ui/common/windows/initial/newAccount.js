module.exports = function(parent) {
	var ui = require("ui/common/components/all"),
		spacing = 10
	
	var win = ui.createWindow('newAccountWindow', {navBarHidden: false})
	
	var container = Ti.UI.createScrollView()
		var form = Ti.UI.createView({ width: '80%', layout: 'vertical' })
		
			var name = ui.createTextField()
			form.add(ui.createFieldLabel({ textid: 'name', top: spacing * 2 }))
			form.add(name)
			
			var email = ui.createTextField({ keyboardType: Ti.UI.KEYBOARD_EMAIL })
			form.add(ui.createFieldLabel({ textid: 'email', top: spacing }))
			form.add(email)
			
			var password = ui.createTextField({ passwordMask: true })
			form.add(ui.createFieldLabel({ textid: 'password', top: spacing }))
			form.add(password)
			
			var confirmPassword = ui.createTextField({ passwordMask: true })
			form.add(ui.createFieldLabel({ textid: 'confirmPassword', top: spacing }))
			form.add(confirmPassword)
			
			
			var create = ui.createButton({
				top: spacing * 2,
				width: '100%',
				titleid: 'createLogin'
			})
			form.add(create)
			
		container.add(form)
	win.add(container)
	
	create.addEventListener('click', function(e) {
		alert('should create the account and login')
		parent.fireEvent('login', { email: 'aaaa', password: '*****' })
	})
	
	return win
}
