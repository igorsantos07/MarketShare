module.exports = function() {
	var ui = require("ui/common/components/defaults")
	var tabs = Ti.UI.createTabGroup(),
		tabLists	= new require('ui/common/windows/main/lists')(),
		tabGroups	= new require('ui/common/windows/main/groups')(),
		tabSettings	= new require('ui/common/windows/main/settings')()
		
	tabs.addTab(tabLists.containingTab)
	tabs.addTab(tabGroups.containingTab)
	tabs.addTab(tabSettings.containingTab)
	tabs.setActiveTab(0)
	
	return tabs
}