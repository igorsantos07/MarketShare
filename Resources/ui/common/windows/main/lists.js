module.exports = function() {
	var ui = require("ui/common/components/defaults")
	
	var win = ui.createTabWindow('listsTab')
	win.add(Ti.UI.createLabel({text:"lists"}))
	
	return win
}