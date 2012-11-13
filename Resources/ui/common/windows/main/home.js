module.exports = function() {
	var ui = require("ui/common/components/defaults")
	var tabGroup = Ti.UI.createTabGroup()
	
	var tabLists = new require('ui/common/windows/main/lists')()
	tabLists.containingTab.tabGroup = tabGroup
	tabGroup.addTab(tabLists.containingTab)
	
	var tabGroups = new require('ui/common/windows/main/groups')()
	tabGroups.containingTab.tabGroup = tabGroup
	tabGroup.addTab(tabGroups.containingTab)
	
	var tabSettings = new require('ui/common/windows/main/settings')()
	tabSettings.containingTab.tabGroup = tabGroup
	tabGroup.addTab(tabSettings.containingTab)
	
	tabGroup.setActiveTab(0)
	
	tabGroup.addEventListener('logout', function() {
		var login = new require('ui/common/windows/initial/login')()
		login.open()
	})
	
	return tabGroup
}