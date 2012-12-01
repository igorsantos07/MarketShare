var _ = require('lib/underscore-1.4.2')._,
	color = require('ui/common/components/colors')

/**
 * @class UI.Windows
 * CommonJS module that contains all window-related widgets and methods.
 */

/**
 * @method createWindow
 * Creates a common window.
 * @param {String} titleid The i18n key for the title
 * @param {Object} properties (optional) additional properties for the section
 * @return {Ti.UI.Window}
 */
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

/**
 * @method createMainWindow
 * Creates a window with almost the same behavior as {@link #createWindow}, except that in Android it
 * becomes a Heavyweight Window (aka Activity). Still needs the property `exitOnClose` if it should be
 * the root window.
 * @param {String} titleid The i18n key for the title
 * @param {Object} properties (optional) additional properties for the section
 * @return {Ti.UI.Window}
 */
exports.createMainWindow = function(titleid, properties) {
	return exports.createWindow(titleid, _.defaults(properties || {}, {
		navBarHidden: false
	}))
}

/**
 * @method createTabWindow
 * Generates a window with an internal `containingTab` property, useful for attaching
 * this window to a TabGroup.
 * @param {String} titleid The i18n key for the title
 * @param {String} icon (optional) the icon to be used in the tab. Android 3.0+ tabs don't use icons anymore
 * @param {Object} properties (optional) additional properties for the section
 * @return {Ti.UI.Window}
 */
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
 * @method createConfirmDialog
 * Creates a confirm dialog, similar to javascript's confirm().
 * @param {String} titleid The i18n key for the title
 * @param {String} messageid The i18n key for the question
 * @param {Function} callback What's going to happen when the user press OK/Yes
 * @param {String} yesid (optional) i18n key for the "Yes" button. Defaults to `yes`
 * @param {String} noid (optional) i18n key for the "No" button. Defaults to `no`
 */
exports.createConfirmDialog = function(titleid, messageid, callback, yesid, noid) {
	yesid = yesid || 'yes'
	noid  = noid  || 'no'
	
	var confirm = Ti.UI.createAlertDialog({
		titleid: titleid,
		messageid: messageid,
		buttonNames: [L(yesid), L(noid)],
		persistent: true,
		cancel: 1
	})
	
	confirm.addEventListener('click', function(e) {
		if (e.cancel === e.index || e.cancel === true) return
		
		if (e.index == 0) callback()
	})
	
	return confirm
}

/*
 * FIXME: showAsAction cannot be defined in the items dictionary; it doesn't get set for some odd reason
 * TODO: item.hidden is adding the item to the old menu, not in the collapsible button 
 */
/**
 * @method setMenu
 * Used to make it easier to add a menu to an Android window.  
 * **Android only**
 * @param {Ti.UI.Window} win the window to receive the menu items
 * @param {Object[]} menuItems an array of menu objects. Each object can have the following properties:
 * 
 *  - titleid: the i18n key for its text
 *  - icon: (optional) path to an image
 *  - click: a callback function for the click event
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

/**
 * @method goTo
 * Useful to move around between windows. Will load and open the given window.
 * @param {String} windowName name to be completed as: `ui/common/windows/«windowName»`
 * @param {Mixed...} windowParams (optional) Other parameters to be sent to the window as a simple array
 */
exports.goTo = function(windowName) {
	var args = Array.prototype.slice.call(arguments)
	windowName = args.shift() //removing windowName from the other arguments
	var win = require('ui/common/windows/'+windowName)(args)
	win.open()
	return win
}
