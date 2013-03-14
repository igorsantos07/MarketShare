module.exports = function() {
	var ui = require("ui/common/components/all"),
		spacing = 10
	
	var win = ui.createMainWindow('settingsWindow', { layout: "vertical" })
	win.add(Ti.UI.createLabel({text:"could this screen be replaced by default android settings screen?", top: 20, width: '80%' }))
	
	ui.setMenu(win, [
		{
			itemId: 1,
			titleid: 'listsWindow',
			icon: 'images/icons/lists.png',
			hidden: true,
			click: function(e) { ui.goTo('main/lists') }
		},
		{
			itemId: 2,
			titleid: 'groupsWindow',
			icon: 'images/icons/groups.png',
			hidden: true,
			click: function(e) { ui.goTo('main/groups') }
		}
	])
	
	return win
}