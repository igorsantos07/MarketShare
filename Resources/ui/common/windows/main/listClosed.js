/**
 * @class Windows.Main.ListClosed
 * This window is a TabGroup that shows the user the products in a list and the costs summary.
 * 
 * @constructor
 * @param {Array} args Arguments for the tab group, as described below:
 * 
 * - 0: `{@link Models.List List}`: the list to be shown
 * - 1: `number`: (optional) Which tab should be focused. Index starts on 1. Defaults to `undefined`,
 *      meaning the first tab will be focused (default behavior of the TabGroup).
 * 
 * @return {Ti.UI.TabGroup}
 */
module.exports = function(args) {
	var _ = require('lib/underscore-1.4.2')._,
		ui = require('ui/common/components/all'),
		List = require('models/List'),
		list = new List(args[0]),
		activeTab = args[1]
		
	var win = Ti.UI.createTabGroup({ title: list.name, scrollable: true })
	
		_([
			new require('ui/common/windows/main/listProducts')([list, true]),
			new require('ui/common/windows/main/listSummary')([list])
		]).each(function(tab) {
			win.addTab(tab.containingTab)
		})
		if (typeof activeTab == 'number')
			win.activeTab = activeTab - 1
		
		win.addEventListener('focus', function(e) {
			var actionBar = win.getActivity().actionBar
			if (actionBar)
				actionBar.title = list.name
		})
		
		ui.setMenu(win, [
			{
				titleid: 'RemoveList',
				icon: Ti.Android.R.drawable.ic_menu_delete,
				click: function(e) { 
					var confirm = ui.createConfirmDialog('sure', 'confirmDeleteList', function() { alert('should remove this list') })
					confirm.show()
				}
			}
		])
	
	return win
}