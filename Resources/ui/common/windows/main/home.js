module.exports = function() {
	var ui = require("ui/common/components/all"),
		_ = require('lib/underscore-1.4.2')._
	
	var tabGroup = Ti.UI.createTabGroup()

	_.each(['lists', 'groups', 'settings'], function(tabName) {
		var tab = require('ui/common/windows/main/'+tabName)()
		tab.containingTab.tabGroup = tabGroup
		tabGroup.addTab(tab.containingTab)
	})	
	
	tabGroup.setActiveTab(0)
	
	tabGroup.addEventListener('logout', function() {
		var login = require('ui/common/windows/initial/login')()
		login.open()
	})
	
	return tabGroup
}