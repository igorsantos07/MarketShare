module.exports = function(args) {
	var _ = require('lib/underscore-1.4.2')._,
		ui = require('ui/common/components/all'),
		List = require('models/List'),	
		list = new List(),
		firstRun = true,
		win = ui.createMainWindow('', { title: list.name }),
		table, notice
		
	list.setFields(args[0])

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
	
	if (_.isArray(list.products) && list.products.length > 0) {
		var tableData = []
		_.each(list.products, function(product) {
			tableData.push({ title: product.name, productId: product.id })
		})
		table = ui.createTableView({ data: tableData })
		win.add(table)
		setRowEvents(list)
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
						//TODO: when opening the costs summary, try to close this window first, as we
						//probably won't be able to hide this button from the ActionBar. Thus, when
						//going back, at least if the user try to open the list again he will see the
						//correct icons (as soon as we implement hiding this item given the list status)
						alert('Now should call the Costs Summary')
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
				var confirm = ui.createConfirmDialog('sure', 'confirmDeleteList', function() { alert('should remove this list') })
				confirm.show()
			}
		}
	])

	//TODO: add a window.activity.onPrepareOptionsMenu or something like this to hide the newItem if the list is closed
	
	return win
}