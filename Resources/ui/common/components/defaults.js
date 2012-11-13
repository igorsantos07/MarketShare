var _ = require('lib/underscore-1.4.2')._

var darkGray = '#4A4542',
	gray = '#B5B6B5' 

/********************************************* WINDOW STUFF *********************************************/

exports.createWindow = function(titleid, properties) {
	return Ti.UI.createWindow(_.extend(properties || {}, {
		titleid: titleid
	}))
}

exports.createSimpleWindow = function(titleid, properties) {
	return exports.createWindow(titleid, _.defaults(properties || {}, {
		backgroundColor: 'lightgray',
		navBarHidden: true
	}))
}

exports.createTabWindow = function(titleid, icon, properties) {
	var win = exports.createWindow(titleid, _.defaults(properties || {}, {
		backgroundColor: 'black',
		navBarHidden: false
	}))
	
	/*
	 * TODO: we should add icon support here for old androids and iphone
	 */
	win.containingTab = Ti.UI.createTab({
		titleid: titleid,
		//icon: icon,
		window: win
	})

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

/********************************************* TABLE STUFF *********************************************/

exports.createTableView = function(properties) {
	return Ti.UI.createTableView(_.defaults(properties || {}, {
		backgroundColor: 'transparent'
	}))
}

exports.createTableViewRow = function(properties) {
	return Ti.UI.createTableViewRow(_.defaults(properties || {}, {
		
	}))
}

exports.createTableViewSection = function(titleid, properties) {
	return Ti.UI.createTableViewSection(
		_.defaults(
			_.extend(properties || {}, { headerTitle: L(titleid) }),
			{
		
			}
		)
	)
}

/********************************************* FORM STUFF *********************************************/

exports.createTextField = function(properties) {
	return Ti.UI.createTextField(_.defaults(properties || {}, {
		width: '100%',
		backgroundColor: 'white',
		color: darkGray,
		borderColor: darkGray,
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		borderRadius: 10,
		borderWidth: 1
	}))	
}

exports.createLabel = function(properties) {
	return Ti.UI.createLabel(_.defaults(properties || {}, {
		width: '100%',
		color: darkGray,
		textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT
	}))	
}

exports.createFieldLabel = function(properties) {
	return exports.createLabel(_.defaults(properties || {}, {
		font: { fontSize: 16 }
	}))	
}

exports.createButton = function(properties) {
	return Ti.UI.createButton(_.defaults(properties || {}, {
		borderRadius: 10,
		color: darkGray,
		backgroundColor: gray
	}))
}
