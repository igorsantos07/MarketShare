module.exports = function() {
	var ui = require("ui/common/components/all"),
		spacing = 10
	
	var win = ui.createTabWindow('settingsTab', { layout: "vertical" })
	win.add(Ti.UI.createLabel({text:"could this screen be replaced by default android settings screen?", top: 20, width: '80%' }))
	
	var logout = ui.createButton({title: 'logout', top: 70})
	logout.addEventListener('click', function() {
		win.containingTab.tabGroup.fireEvent('logout')
	})
	win.add(logout)
	
	ui.setMenu(win, [
		{
			itemId: 1,
			titleid: 'listsWindow',
			icon: 'images/icons/lists.png',
			hidden: true,
			click: function(e) { alert('should go to lists') }
		},
		{
			itemId: 2,
			titleid: 'groupsWindow',
			icon: 'images/icons/groups.png',
			hidden: true,
			click: function(e) { alert('should go to groups') }
		}
	])
	
	return win
}