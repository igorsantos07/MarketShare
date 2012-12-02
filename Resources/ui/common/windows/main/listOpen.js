module.exports = function(args) {
	var _ = require('lib/underscore-1.4.2')._,
		ui = require('ui/common/components/all'),
		List = require('models/List'),
		list, win, table, notice
	
	if (_.isObject(args[0])) {
		list = args[0]
		win = ui.createMainWindow('', { title: list.name })
		/* Had to create the win object here because, for some reason, the title was
		 * only being overrided in the addListData function when called as callback (maybe
		 * the window object was still being instatiated by Titanium when the code get to
		 * win.setTitle()?) */
	}
	else {
		id = args[0]
		win = ui.createMainWindow('loading')
	}
	
	var addListData = function(list) {
		win.title = list.name
		if (_.isArray(list.products) && list.products.length > 0) {
			var tableData = []
			_.each(list.products, function(product) {
				tableData.push({ title: product.name, productId: product.id })
			})
			table = ui.createTableView({ data: tableData })
			win.add(table)
		}
		else {
			notice = ui.createNoticeText('noItemToShow') 
			win.add(notice)
		}
	}
		
	if (id) {
		var list = new List()
		list.findById(id, function(data) {
			list.setFields(data)
			addListData(list)
		})
	}
	else {
		addListData(list)
	}
	
	win.addEventListener('productAdded', function(product) {
		if (table)
			table.appendRow({ title: product.name, productId: product.id })
		else {
			if (notice) {
				win.remove(notice)
				notice = null
			}
			list.products = [product]
			addListData(list)				
		}
	})
		
	ui.setMenu(win, [
		{
			itemId: 1,
			titleid: 'editName',
			icon: Ti.Android.R.drawable.ic_menu_edit,
			click: function(e) {
				var renameDialog = ui.createPromptDialog('editName', 'newName',
					{ autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_SENTENCES }, null,
					function(newName) {
					list.update({ name: newName }, function(newList) {
						list.setFields(newList)
						win.title = list.name
					})
				})
				renameDialog.show()
			}
		},
		{
			itemId: 2,
			titleid: 'newItem',
			icon: Ti.Android.R.drawable.ic_menu_add,
			click: function(e) { ui.goTo('main/listNewItem', list.id, win) }
		},
		{
			itemId: 3,
			titleid: 'RemoveList',
			icon: Ti.Android.R.drawable.ic_menu_delete,
			hidden: true,
			click: function(e) { 
				var confirm = ui.createConfirmDialog('sure', 'confirmDeleteList', function() { alert('should remove this list') })
				confirm.show()
			}
		}
	])
	
	return win
}