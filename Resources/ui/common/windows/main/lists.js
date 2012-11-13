module.exports = function() {
	var ui = require("ui/common/components/defaults")
	
	var win = ui.createTabWindow('listsTab')
	
		var openLists		= ui.createTableViewSection('openLists'),
			pendingLists	= ui.createTableViewSection('pendingLists'),
			archivedLists	= ui.createTableViewSection('archivedLists')
	
			openLists.add(ui.createTableViewRow({ title: "Shopping List" }))
			openLists.add(ui.createTableViewRow({ title: "Weekend Party List" }))

			pendingLists.add(ui.createTableViewRow({ title: "Last week shopping" }))
			pendingLists.add(ui.createTableViewRow({ title: "Last week party" }))
			pendingLists.add(ui.createTableViewRow({ title: "Travel to Montreal" }))
			
			archivedLists.add(ui.createTableViewRow({ title: "Shopping 04/11" }))
			archivedLists.add(ui.createTableViewRow({ title: "Shopping 11/11" }))
			archivedLists.add(ui.createTableViewRow({ title: "Truro Party" }))
			archivedLists.add(ui.createTableViewRow({ title: "Travel to Québec" }))
			archivedLists.add(ui.createTableViewRow({ title: "Arrival shopping" }))
			
		win.add(ui.createTableView({ data: [openLists, pendingLists, archivedLists] }))
		
	return win
}