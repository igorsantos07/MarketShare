module.exports = function() {
	var _ = require('lib/underscore-1.4.2')._,
		ui = require('ui/common/components/all'),
		List = require('models/List')
	
	var win = ui.createMainWindow('listsWindow', { exitOnClose: true })

		var openLists, pendingLists, archivedLists,
			lists = new List().findAll({}, function(lists) {
				if (_.isEmpty(lists)) {
					win.add(ui.createNoticeText('nolistToShow'))
				}
				else {
					var thisList
					openLists		= ui.createTableViewSection('openLists'),
					pendingLists	= ui.createTableViewSection('pendingLists'),
					archivedLists	= ui.createTableViewSection('archivedLists')
					
					_.each(lists, function(list) {
						if (list.status)
							thisList = openLists
						else
							thisList = (list.paid)? archivedLists : pendingLists
						
						var line = ui.createTableViewRow({ title: list.name, listId: list._id.$oid })
						thisList.add(line)
					})
			
					var data = []
					_.each([openLists, pendingLists, archivedLists], function(list) {
						if (list.rowCount > 0) data.push(list)
					})
					
					var table = ui.createTableView({ data: data }) 
					win.add(table)
					
					table.addEventListener('click', function(e) {
						ui.goTo('main/listOpen', e.row.listId)
					})
				}
			})
		
		ui.setMenu(win, [
			{
				itemId: 1,
				titleid: 'newList',
				icon: Ti.Android.R.drawable.ic_menu_add,
				click: function(e) {
					var list = new List({ status: List.STATUS.OPEN }).save(function(newList) {
						ui.goTo('main/listOpen', newList)
					})
				}
			},
			{
				itemId: 2,
				titleid: 'groupsWindow',
				icon: 'images/icons/groups.png',
				hidden:true,
				click: function(e) { ui.goTo('main/groups') }
			},
			{
				itemId: 3,
				titleid: 'settingsWindow',
				icon: Ti.Android.R.drawable.ic_menu_preferences,
				hidden: true,
				click: function(e) { ui.goTo('main/settings') }
			}
		])
		
	return win
}