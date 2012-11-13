module.exports = function() {
	var ui = require("ui/common/components/defaults")
	
	var win = ui.createTabWindow('groupsTab')
	
		var table = ui.createTableView()
	
			table.appendRow(ui.createTableViewRow({ title: "Group 1" }))
			table.appendRow(ui.createTableViewRow({ title: "Group 2" }))
			table.appendRow(ui.createTableViewRow({ title: "Group 3" }))
		
		win.add(table)
		
	return win
}