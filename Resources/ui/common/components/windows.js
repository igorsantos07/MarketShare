var _ = require('lib/underscore-1.4.2')._,
	color = require('ui/common/components/colors')

exports.createWindow = function(titleid, properties) {
	return Ti.UI.createWindow(
		_.defaults(
			_.extend(properties || {}, { titleid: titleid }),
			{
				backgroundColor: color.bg
			}
		)
	)
}

exports.createMainWindow = function(titleid, properties) {
	return exports.createWindow(titleid, _.defaults(properties || {}, {
		navBarHidden: false
	}))
}

exports.createTabWindow = function(titleid, icon, properties) {
	var win = exports.createWindow(titleid, _.defaults(properties || {}, {

	}))
	
	win.containingTab = Ti.UI.createTab({
		titleid: titleid,
		window: win
	})
	
	if (icon != undefined) win.containingTab.setIcon(icon)

	return win
}

/*
 * FIXME: showAsAction cannot be defined in the items dictionary; it doesn't get set for some odd reason
 * TODO: item.hidden is adding the item to the old menu, not in the collapsible button 
 */
/**
 * @param win the window to receive the menu items
 * @param menuItems an array of menu objects. Each object can have the following properties:
 *   titleid: the i18n key for its text
 *   icon: [optional] path to an image
 *   click: a callback function for the click event
 */
exports.setMenu = function(win, items) {
	if (Titanium.Platform.name == 'android') {
		win.activity.onCreateOptionsMenu = function(e) {
			_.each(items, function(item) {
				var entry = e.menu.add({
					showAsAction: item.hidden? Ti.Android.SHOW_AS_ACTION_NEVER : Ti.Android.SHOW_AS_ACTION_IF_ROOM,
					itemId: item.itemId || Math.floor(Math.random()*1001), //making sure that every item has an ID
					title: L(item.titleid)
				})
				
				if (item.icon != undefined)	entry.setIcon(item.icon)

				entry.addEventListener('click', item.click);
			})
		}
	}
}

exports.goTo = function(windowName) {
	var args = Array.prototype.slice.call(arguments)
	windowName = args.shift() //removing windowName from the other arguments
	var win = require('ui/common/windows/'+windowName)(args)
	win.open()
	return win
}
