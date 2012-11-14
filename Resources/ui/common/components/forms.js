var _ = require('lib/underscore-1.4.2')._,
	color = require('ui/common/components/colors'),
	android = (Titanium.Platform.name == 'android'),
	iOS = (Titanium.Platform.name == 'iphone' || Titanium.Platform.name == 'ipad')

exports.createTextField = function(properties) {
	var defaultValues = {
		width: '100%',
		backgroundColor: color.field.bg,
		color: color.field.color
	}
	
	if (iOS) {
		_.extend(defaultValues, {
		//borderColor: darkGray,
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		//borderRadius: 10,
		//borderWidth: 1
		})
	}
	
	return Ti.UI.createTextField(_.defaults(properties || {}, defaultValues))	
}

exports.createLabel = function(properties) {
	return Ti.UI.createLabel(_.defaults(properties || {}, {
		width: '100%',
		color: color.text,
		textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT
	}))	
}

exports.createFieldLabel = function(properties) {
	return exports.createLabel(_.defaults(properties || {}, {
		color: color.label,
		font: { fontSize: 16 }
	}))	
}

exports.createButton = function(properties) {
	return Ti.UI.createButton(_.defaults(properties || {}, {
		borderRadius: 10
	}))
}