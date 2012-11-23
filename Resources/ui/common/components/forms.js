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

/**
 * Creates a picker with an array of simple strings/numbers
 * @param Array data
 * @param Object properties [optional]
 * @param boolean useTitle [optional] if the values are to be used as "title" or "titleid". Defaults to false 
 */
exports.createSimplePicker = function(data, properties, useTitle) {
	var rows = [],
		picker = Ti.UI.createPicker(_.defaults(properties || {}, {
			width: '100%'
		}))
	
	for (var i in data)
		rows[i] = Ti.UI.createPickerRow( useTitle? { title: data[i] } : { titleid: data[i] } )
		
	picker.add(rows)
	return picker
}

/**
 * Creates a switch object, forcing checkbox style in Android
 * @param string titleid
 * @param Object properties [optional]
 * @param boolean useTitle [optional] if titleid should be used as a raw title instead
 */
exports.createCheckbox = function(titleid, properties, useTitle) {
	return Ti.UI.createSwitch(
		_.extend(
			_.defaults(properties || {}, 
				useTitle? { title: titleid } : { titleid: titleid }	
			),
			{ style: Ti.UI.Android.SWITCH_STYLE_CHECKBOX }
		)
	)
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