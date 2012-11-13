module.exports = function() {
	var ui = require("ui/common/components/defaults"),
		spacing = 10
	
	var win = ui.createTabWindow('listsTab')
	win.add(Ti.UI.createLabel({text:"lists"}))
	
	return win
}