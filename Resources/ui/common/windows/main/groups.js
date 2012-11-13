module.exports = function() {
	var ui = require("ui/common/components/defaults"),
		spacing = 10
	
	var win = ui.createTabWindow('groupsTab')
	win.add(Ti.UI.createLabel({text:"groups"}))
	
	return win
}