module.exports = function() {
	var ui = require("ui/common/components/defaults"),
		spacing = 10
	
	var win = ui.createTabWindow('settingsTab')
	win.add(Ti.UI.createLabel({text:"settings"}))
	
	return win
}