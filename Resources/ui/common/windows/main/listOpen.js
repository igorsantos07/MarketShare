module.exports = function(args) {
	var _ = require('lib/underscore-1.4.2')._,
		ui = require('ui/common/components/all'),
		List = require('models/List')
	
	if (_.isObject(args[0])) {
		var list = args[0],
			win = ui.createMainWindow('', { title: list.name })
			/* Had to create the win object here because, for some reason, the title was
			 * only being overrided in the addListData function when called as callback (maybe
			 * the window object was still being instatiated by Titanium when the code get to
			 * win.setTitle()?) */
	}
	else {
		var id = args[0],
			win = ui.createMainWindow('loading')
	}
	
	var addListData = function(list) {
		win.title = list.name
		if (_.isArray(list.products) && list.products.length > 0) {
			var tableData
			_.each(list.products, function(product) {
				tableData.push({ title: product.name, productId: product.id })
			})
			var table = ui.createTableView({ data: tableData })
		}
	}
		
	if (list) {
		addListData(list)
	}
	else {
		var list = new List()
		list.findById(id, function(list) {
			addListData(list)
		})
	}
		
	ui.setMenu(win, [
		{
			itemId: 1,
			titleid: 'editName',
			icon: Ti.Android.R.drawable.ic_menu_edit,
			click: function(e) { alert("Should prompt user for a new name") }
		},
		{
			itemId: 2,
			titleid: 'newItem',
			icon: Ti.Android.R.drawable.ic_menu_add,
			click: function(e) { ui.goTo('main/listNewItem') }
		},
		{
			itemId: 3,
			titleid: 'RemoveList',
			icon: Ti.Android.R.drawable.ic_menu_delete,
			hidden: true,
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