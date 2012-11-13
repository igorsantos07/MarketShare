var _ = require('lib/underscore-1.4.2')._

var darkerGray = '#212021',
	darkGray = '#4A4542',
	gray = '#B5B6B5' 

exports.createTextField = function(properties) {
	return Ti.UI.createTextField(_.defaults(properties || {}, {
		width: '100%',
		backgroundColor: darkerGray,
		//color: darkGray,
		//borderColor: darkGray,
		//borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		//borderRadius: 10,
		//borderWidth: 1
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
		color: 'white',
		font: { fontSize: 16 }
	}))	
}

exports.createButton = function(properties) {
	return Ti.UI.createButton(_.defaults(properties || {}, {
		borderRadius: 10
	}))
}