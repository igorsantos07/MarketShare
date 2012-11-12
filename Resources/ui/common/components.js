var _ = require('lib/underscore-1.4.2')._

var darkGray = '#4A4542',
	gray = '#B5B6B5'

exports.createTextField = function(properties) {
	return Ti.UI.createTextField(_.defaults(properties, {
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
	return Ti.UI.createLabel(_.defaults(properties, {
		width: '100%',
		color: darkGray,
		textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT
	}))	
}

exports.createFieldLabel = function(properties) {
	return exports.createLabel(_.defaults(properties, {
		font: { fontSize: 16 }
	}))	
}

exports.createButton = function(properties) {
	return Ti.UI.createButton(_.defaults(properties, {
		borderRadius: 10,
		color: darkGray,
		backgroundColor: gray
	}))
}
