module.exports = function() {
	var ui = require("ui/common/components/defaults"),
		spacing = 10
	
	var win = ui.createSimpleWindow('loginWindow')
	
		var loginBox = Ti.UI.createScrollView({
			width: '80%',
			layout: 'vertical'
		})
		
			loginBox.add(Ti.UI.createImageView({
				top: spacing,
				image: '/images/logo-big.png',
			}))
			
			var email = ui.createFieldLabel({
				textid: 'email',
				top: spacing,
				color: 'black'
			})
			loginBox.add(email)
			
			loginBox.add(ui.createTextField({
				keyboardType: Ti.UI.KEYBOARD_EMAIL
			}))
			
			var password = ui.createFieldLabel({
				textid: 'password',
				top: spacing
			})
			loginBox.add(password)
			
			loginBox.add(ui.createTextField({
				passwordMask: true
			}))
		
			btnLogin = ui.createButton({
				top: 20,
				width: '100%',
				titleid: 'login'
			})
			loginBox.add(btnLogin)
			
			var newAccountBox = Ti.UI.createView({
				layout: 'horizontal',
				top: 20,
				right: 0
			})
			
				newAccountBox.add(ui.createLabel({
					textid: 'neverUsed',
					width: '45%',
					right: 10,
					textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
					font: { fontSize: 13 }
				}))
				
				btnNew = ui.createButton({
					width: '50%',
					titleid: 'newAccount',
				})
				newAccountBox.add(btnNew)
				
			loginBox.add(newAccountBox)
		win.add(loginBox)
	
	return win
}