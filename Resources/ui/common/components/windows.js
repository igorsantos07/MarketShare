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
			var menu = e.menu
			for(i in items) {
				var item = items[i],
					entry = menu.add({ title: L(item.titleid) })
				if (item.icon != undefined) entry.setIcon(item.icon)
				entry.addEventListener('click', item.click);
			}
		}
	}
}