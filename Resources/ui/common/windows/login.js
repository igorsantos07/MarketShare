module.exports = function() {
	var ui = require("ui/common/components"),
		spacing = 10
	
	var win = Ti.UI.createWindow({
		titleid: 'loginWindow',
		backgroundColor: 'lightgray',
		navBarHidden: true
	})
	
		var loginBox = Ti.UI.createScrollView({
			width: '80%',
			layout: 'vertical'
		})
		
			loginBox.add(Ti.UI.createImageView({
				top: spacing,
				image: '/images/logo-big.png',
			}))
			
			loginBox.add(ui.createFieldLabel({
				textid: 'email',
				top: spacing,
				color: 'black'
			}))
			
			loginBox.add(ui.createTextField({
				keyboardType: Ti.UI.KEYBOARD_EMAIL
			}))
			
			loginBox.add(ui.createFieldLabel({
				textid: 'password',
				top: spacing
			}))
			
			loginBox.add(ui.createTextField({
				passwordMask: true
			}))
		
			loginBox.add(ui.createButton({
				top: 20,
				width: '100%',
				titleid: 'login'
			}))
			
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
				
				newAccountBox.add(ui.createButton({
					width: '50%',
					titleid: 'newAccount',
				}))
				
			loginBox.add(newAccountBox)
		win.add(loginBox)
	
	return win
}