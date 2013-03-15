/**
 * @class Windows.Main.ListProducts
 * This window shows the user all the products contained in a shopping list.
 * 
 * @constructor
 * @param {Array} args Arguments for this window, as described below:
 * 
 * - 0: `{@link Models.List List}`: the list to be shown
 * - 1: `boolean`: (optional) if this window should be opened as a tab instead of a main window.
 * 		Defaults to `false`
 * 
 * @return {Ti.UI.Window}
 */
module.exports = function(args) {
	var _ = require('lib/underscore-1.4.2')._,
		ui = require('ui/common/components/all'),
		List = require('models/List'),	
		list = new List(args[0]),
		firstRun = true,
		isTab = Boolean(args[1]),
		win = (isTab)?
			ui.createTabWindow('products') :
			ui.createMainWindow('', { title: list.name }),
		table, notice

	var rowChangeCheck = function(e) {
		e.row.hasCheck = !e.row.hasCheck
	}
	
	var rowDetails = function(e) {
		alert('should show product details')
	}
	
	var setRowEvents = function(list) {
		if (list.status == List.STATUS.OPEN) {
			if (!firstRun) {
				table.removeEventListener('click', rowChangeCheck)
				table.removeEventListener('longpress', rowDetails)
			}
			table.addEventListener('singletap', rowDetails)
		}
		else if (list.status == List.STATUS.SHOPPING) {
			if (!firstRun) table.removeEventListener('singletap', rowDetails)
			table.addEventListener('click', rowChangeCheck)
			table.addEventListener('longpress', rowDetails)
		}
		firstRun = false
	}
	
	var changeListStatus = function(status, callback) {
		list.update({ status: status }, function() {
			list.status = status
			setRowEvents(list)
			if (typeof callback == 'function') callback()
		})
	}
	
	var addListData = function(list) {
		var tableData = []
		_.each(list.products, function(product) {
			tableData.push({ title: product.name, productId: product.id })
		})
		table = ui.createTableView({ data: tableData })
		win.add(table)
		setRowEvents(list)
	}
	
	if (_.isArray(list.products) && list.products.length > 0) {
		addListData(list)
	}
	else {
		notice = ui.createNoticeText('noItemToShow') 
		win.add(notice)
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
	
	if (!isTab) {
		var shopping = {icon: 'images/icons/shopping.png', titleid: 'ImShopping'},
			finished = {icon: 'images/icons/calc.png', titleid: 'ImFinished'}
			
		switch (list.status) {
			case List.STATUS.OPEN:		var nextStatus = shopping; break
			case List.STATUS.SHOPPING:	var nextStatus = finished; break
			default:
				var nextStatus = shopping
				Ti.API.error('Unkown list status to define the icon for the next one')
		}
	
		ui.setMenu(win, [
			{
				//TODO: this option can be hidden in the menu, so it can be easily changed when needed
				titleid: nextStatus.titleid,
				icon: nextStatus.icon,
				click: function(e) {
					if (list.status == List.STATUS.OPEN) {
						changeListStatus(List.STATUS.SHOPPING, function() {
							//TODO: we should change the icon too, but it's not allowed
							//e.source.icon = finished.icon
							Ti.UI.createNotification({message: L('nowYouCanCheck'), duration: Ti.UI.NOTIFICATION_DURATION_LONG}).show()
							e.source.title = L('finished')
						})
					}
					else if (list.status == List.STATUS.SHOPPING) {
						changeListStatus(List.STATUS.CLOSED, function() {
							list.close(function(closedList) {
								win.close()
								ui.goTo('main/listClosed', closedList, 2)
							})
						})
					}
				}
			},
			{
				titleid: 'newItem',
				icon: Ti.Android.R.drawable.ic_menu_add,
				click: function(e) { ui.goTo('main/listNewItem', list.id, win) }
			},
			{
				titleid: 'editName',
				icon: Ti.Android.R.drawable.ic_menu_edit,
				hidden: true,
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
				titleid: 'RemoveList',
				icon: Ti.Android.R.drawable.ic_menu_delete,
				hidden: true,
				click: function(e) { 
					ui.createConfirmDialog('sure', 'confirmDeleteList', function() {
						list.remove(function() {
							win.close()
						})
					}).show()
				}
			}
		])
	}

	return win
}