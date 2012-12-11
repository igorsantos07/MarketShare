var _ = require('lib/underscore-1.4.2')._,
	color = require('ui/common/components/colors'),
	form = require('ui/common/components/forms'),
	android = (Ti.Platform.name == 'android'),
	iOS = (Ti.Platform.name == 'iphone' || Ti.Platform.name == 'ipad')

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
 * becomes a Heavyweight Window (aka Activity). If you need a root window, use {@link #createRootWindow},
 * that adds the exitOnClose property.
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
 * @method createRootWindow
 * Creates a window with almost the same behavior as {@link #createMainWindow} (a heavyweight/Activity
 * when running in Android), but adds exitOnClose and sets this window as the current one in
 * `Ti.App.currentWindow` - as this property is changed by {@link #goTo} but you'll never move from
 * another window to a root one.
 * @param {String} titleid The i18n key for the title
 * @param {Object} properties (optional) additional properties for the section
 * @return {Ti.UI.Window}
 */
exports.createRootWindow = function(titleid, properties) {
	Ti.App.currentWindow = exports.createMainWindow(titleid, _.defaults(properties || {}, {
		exitOnClose: true
	}))
	
	return Ti.App.currentWindow
}

/**
 * @method createModalWindow
 * Generates a window that floats over the others, being a little smaller than the screen
 * and hovering over a dim background. Can be dismissed with the back button or through a custom
 * event, calling `modal.close()`.
 * Internally, it creates a window with semi-transparent background and adds to it a view that's
 * going to act as the modal. This view receives `open()` and `close()` methods to ask his background
 * to open and close. The background is accessible through `modal.bgWindow`.
 * @param {String} titleid (optional) The i18n key for the title. Usually is not shown
 * @param {Object} properties (optional) additional properties for the modal window
 * @param {Object} bgProperties (optional) additional properties for the background
 * @param {boolean} useScrollBg (optional) if the background should be scrollable, for when the modal
 * is not going to fill the entire screen. Defaults to `false`
 * @return {Ti.UI.View}
 */
exports.createModalWindow = function(titleid, properties, bgProperties, useScrollBg) {
	//creating the modal view, the background window, and attaching them
	var modal = Ti.UI.createView(_.defaults(properties || {}, {
		width: '85%',
		height: '90%',
		backgroundColor: color.bgModal,
		layout: 'vertical',
	}))
	
	modal.bgWindow = exports.createWindow(titleid, _.defaults(bgProperties || {}, {
		opacity: 0.65,
		backgroundColor: color.bgOp,
		navBarHidden: true
	}))
	if (useScrollBg) {
		var scroll = Ti.UI.createScrollView()
		scroll.add(modal)
		modal.bgWindow.add(scroll)
	}
	else {
		modal.bgWindow.add(modal)
	}
	
	//adding custom methods to the view to work with the real window
	modal.open = function() { this.bgWindow.open() }
	modal.close = function() { this.bgWindow.close() }
	
	/* adding a stationary title to the window. If the dev adds later a ScrollView to it,
	 * this title will still be visible */
	modal.add(form.createLabel({
		textid: titleid,
		color: color.label,
		backgroundColor: color.bgModal,
		top: 10, left: 10, right: 10,
		font: { fontSize: 20 }
	}))
	
	return modal
}

/**
 * @method createTabWindow
 * Generates a window with an internal `containingTab` property, useful for attaching
 * this window to a TabGroup.
 * @param {String} titleid The i18n key for the title
 * @param {String} icon (optional) icon to be used in the tab. Android 3.0+ tabs don't use icons anymore
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
 * @method createPromptDialog
 * Generates a modal with a text field and two buttons: OK and Cancel.
 * The modal is dismissable with the Cancel or the HW Back button; OK calls a callback.
 * @param {String} titleid The i18n key for the title
 * @param {String} promptid The i18n key for the field label
 * @param {Function} callback what's going to happen with the field value. The dialog will close
 * imediatelly before the callback. It receives as argument the field value.
 * @param {Object} fieldProperties (optional) used to set things like capitalization and keyboard
 * preferences for the prompt field. Defaults to `{}`
 * @param {String} okid (optional) The i18n key for the OK button. Defaults to 'ok'
 * @return {Ti.UI.View}
 */
exports.createPromptDialog = function(titleid, promptid, fieldProperties, okid, callback) {
	var spacing = 20,
		okid = okid || 'ok'
	
	var prompt = exports.createModalWindow(titleid, { height: Ti.UI.SIZE, width: '90%' }, {}, true),
		container = Ti.UI.createView({ width: '90%', layout: 'horizontal', height: Ti.UI.SIZE }),
			field = form.createTextField(_.defaults(fieldProperties, {
				width: '100%',
				backgroundColor: color.field.bgModal
			}))
			container.add(form.createFieldLabel({ textid: promptid, width: '100%', top: spacing }))
			container.add(field)
		prompt.add(container)
		
		var totalWidth = Ti.Platform.displayCaps.platformWidth * 0.9,
			btnWidth = (totalWidth - (spacing / 2) * 3) / 2, //total - half-space for lef/middle/right
			btnBox = Ti.UI.createView({
				width: '100%',
				top: spacing,
				bottom: spacing / 2,
				left: 0, right: 0,
				height: Ti.UI.SIZE,
				layout: 'horizontal'
			})
				var okBtn = form.createButton({
					titleid: okid,
					width: btnWidth,
					left: spacing / 2
				})
				var cancelBtn = form.createButton({
					titleid: 'cancel',
					width: btnWidth,
					left: spacing / 2,
					right: spacing / 2
				})
			btnBox.add(okBtn)
			btnBox.add(cancelBtn)
		prompt.add(btnBox)
		
		okBtn.addEventListener('click', function(e) {
			prompt.close()
			callback(field.value)
		})
		cancelBtn.addEventListener('click', function(e) {
			prompt.close()
		})
		
	prompt.show = function() { this.open() }
	prompt.hide = function() { this.close() }
	
	return prompt
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
					itemId: item.itemId || Math.floor(Math.random()*1001), //every item needs an ID
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
	Ti.App.currentWindow = win
	
	var openParams = {}
	if (android)	openParams.animated = true
	if (iOS)		openParams.transition = Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT
	
	win.open(openParams)
	return win
}
