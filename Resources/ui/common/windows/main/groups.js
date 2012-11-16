module.exports = function() {
	var ui = require("ui/common/components/all")
	
	var win = ui.createTabWindow('groupsTab')
	
		var table = ui.createTableView()
	
			table.appendRow(ui.createTableViewRow({ title: "Group 1" }))
			table.appendRow(ui.createTableViewRow({ title: "Group 2" }))
			table.appendRow(ui.createTableViewRow({ title: "Group 3" }))
		
		win.add(table)
		
		/**
		 * TODO: Not working, looks like the TabGroup is the only activity, instead of each tab being one
		 */
		win.menu = [
			{
				itemId: 1,
				titleid: 'newGroup',
				icon: Ti.Android.R.drawable.ic_menu_add,
				click: function(e) { alert('should add a new group') }
			},
			{
				itemId: 2,
				titleid: 'joinGroup',
				icon: 'images/icons/join.png',
				click: function(e) { alert('should join another group') }
			}
		]
		
		
	return win
}