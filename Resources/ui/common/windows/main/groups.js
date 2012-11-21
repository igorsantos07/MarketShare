module.exports = function() {
	var ui = require("ui/common/components/all")
	
	var win = ui.createMainWindow('groupsWindow')
	
		var table = ui.createTableView()
	
			table.appendRow(ui.createTableViewRow({ title: "Group 1" }))
			table.appendRow(ui.createTableViewRow({ title: "Group 2" }))
			table.appendRow(ui.createTableViewRow({ title: "Group 3" }))
		
		win.add(table)
		
		ui.setMenu(win, [
			{
				itemId: 1,
				titleid: 'joinGroup',
				icon: 'images/icons/join.png',
				click: function(e) { ui.goTo('main/groupJoin') }
			},
			{
				itemId: 2,
				titleid: 'newGroup',
				icon: Ti.Android.R.drawable.ic_menu_add,
				click: function(e) { ui.goTo('main/groupNew') }
			},
			{
				itemId: 3,
				titleid: 'listsWindow',
				icon: 'images/icons/lists.png',
				hidden: true,
				click: function(e) { ui.goTo('main/lists') }
			},
			{
				itemId: 4,
				titleid: 'settingsWindow',
				icon: Ti.Android.R.drawable.ic_menu_preferences,
				hidden: true,
				click: function(e) { ui.goTo('main/settings') }
			}
		])
		
	return win
}