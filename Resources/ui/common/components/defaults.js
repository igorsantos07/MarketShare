var _ = require('lib/underscore-1.4.2')._

var darkGray = '#4A4542',
	gray = '#B5B6B5' 

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

exports.createTableView = function(properties) {
	return Ti.UI.createTableView(_.defaults(properties || {}, {
		backgroundColor: 'transparent'
	}))
}

exports.createTableViewRow = function(properties) {
	return Ti.UI.createTableViewRow(_.defaults(properties || {}, {
		
	}))
}

exports.createTableViewSection = function(properties) {
	return Ti.UI.createTableSection(_.defaults(properties || {}, {
		
	}))
}

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
