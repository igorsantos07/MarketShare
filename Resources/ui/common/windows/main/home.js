module.exports = function() {
	var ui = require("ui/common/components/all"),
		_ = require('lib/underscore-1.4.2')._
	
	var tabGroup = Ti.UI.createTabGroup()
	tabGroup.menus = {}

	_.each(['lists', 'groups', 'settings'], function(tabName) {
		var tabWindow = require('ui/common/windows/main/'+tabName)()
		tabWindow.tab.tabGroup = tabGroup
		tabGroup.addTab(tabWindow.tab)
		if (tabWindow.menu != undefined) {
			tabGroup.menus[tabWindow.titleid] = tabWindow.menu
		}
	})
	
	tabGroup.setActiveTab(0)
	tabGroup.activeMenu = tabGroup.activeTab.window.titleid
	var activity = tabGroup.activeTab.window.getActivity()
	
	tabGroup.addEventListener('logout', function() {
		var login = require('ui/common/windows/initial/login')()
		login.open()
	})
	
	activity.onCreateOptionsMenu = function(e) {
		for (window in tabGroup.menus) {
			var currentMenu = (window == tabGroup.activeTab.window.titleid)
			_.each(tabGroup.menus[window], function(item) {
				var menuItem = e.menu.add(_.extend(item, { title: L(item.titleid) }))
				menuItem.visible = currentMenu
				menuItem.ownerWindow = window
			})
		}
		return true
	}
	
	activity.onPrepareOptionsMenu = function(e) {
		var currentWindow = tabGroup.activeTab.window.titleid
		
		if (tabGroup.activeMenu != currentWindow) {
			_.each(e.menu.items, function(item) { item.visible = (item.ownerWindow == currentWindow) })
			tabGroup.activeMenu = currentWindow
		}
	}
	
	return tabGroup
}