module.exports = function(parent) {
	var ui = require("ui/common/components/all"),
		spacing = 10,
		User = require('models/User')
	
	var win = ui.createWindow('newAccountWindow', {navBarHidden: false})
	
	var container = Ti.UI.createScrollView()
		var form = Ti.UI.createView({ width: '80%', layout: 'vertical' })
		
			var fullName = ui.createTextField()
			form.add(ui.createFieldLabel({ textid: 'name', top: spacing * 2 }))
			form.add(fullName)
			
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
		var clearName = fullName.value.trim(),
			firstSpace = clearName.indexOf(' ')
		if (firstSpace < 0) {
			var name = clearName,
				surname = null
		}
		else {
			var name = clearName.substring(0, firstSpace),
				surname = clearName.substring(firstSpace+1)
		}
		
		if (password.value != confirmPassword.value) {
			alert(L('passwordMismatch'))
		}
		else {
			var user = new User({
				name: name,
				surname: surname,
				email: email.value.trim(),
				password: Ti.Utils.md5HexDigest(password.value)
			})
			user.save(function(savedUser) {
				parent.fireEvent('login', { id: savedUser.id })
			})
		}
	})
	
	return win
}
