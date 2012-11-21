module.exports = function() {
	var ui = require("ui/common/components/all")
	
	var win = ui.createMainWindow('', { title: 'My Shopping List' })
	
		var table = ui.createTableView()
	
			table.appendRow(ui.createTableViewRow({ title: "Item 1" }))
			table.appendRow(ui.createTableViewRow({ title: "Item 2" }))
			table.appendRow(ui.createTableViewRow({ title: "Item 3" }))
		
		win.add(table)
		
		ui.setMenu(win, [
			{
				itemId: 1,
				titleid: 'editName',
				icon: Ti.Android.R.drawable.ic_menu_edit,
				click: function(e) { alert("Should prompt user for a new name") }
			},
			{
				itemId: 2,
				titleid: 'newGroup',
				icon: Ti.Android.R.drawable.ic_menu_delete,
				click: function(e) { 
					var confirm = Ti.UI.createAlertDialog({
						titleid: 'sure',
						messageid: 'confirmDeleteList',
						buttonNames: [L('yes'), L('no')],
						persistent: true,
						cancel: 1
					})
					confirm.addEventListener('click', function(e) {
						if (e.cancel === e.index || e.cancel === true) return
						
						if (e.index == 0) alert("should remove this list")
					})
					confirm.show()
				}
			}
		])
		
	return win
}