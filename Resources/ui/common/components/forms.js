var _ = require('lib/underscore-1.4.2')._,
	color = require('ui/common/components/colors'),
	android = (Titanium.Platform.name == 'android'),
	iOS = (Titanium.Platform.name == 'iphone' || Titanium.Platform.name == 'ipad')

/**
 * @class UI.Forms
 * CommonJS module that contains all form-related widgets.
 */

/**
 * @method createTextField
 * Creates a text field, suitable for user text input.
 * @param {Object} properties (optional) additional properties for the text field
 * @return {Ti.UI.TextField}
 */
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
 * @method createSimplePicker
 * Creates a picker with an array of simple strings/numbers.
 * @param {Array} data each option in the picker
 * @param {Object} properties (optional)
 * @param {boolean} useTitle (optional) if the values are to be used as "title" or "titleid". Defaults to false
 * @return {Ti.UI.Picker}
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
 * @method createCheckbox
 * Creates a switch object, forcing checkbox style in Android.
 * @param {String} titleid
 * @param {Object} properties (optional)
 * @param {boolean} useTitle (optional) if titleid should be used as a raw title instead
 * @return {Ti.UI.Switch}
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

/**
 * @method createLabel
 * Creates a text label, to write text in the screen.
 * @param {Object} properties (optional) additional properties for the text block
 * @return {Ti.UI.Label}
 */
exports.createLabel = function(properties) {
	return Ti.UI.createLabel(_.defaults(properties || {}, {
		width: '100%',
		color: color.text,
		textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT
	}))	
}

/**
 * @method createFieldLabel
 * Creates a text label, to be used along with a form field. This method extends {@link UI.Forms#createFieldLabel}
 * @param {Object} properties (optional) additional properties for the label
 * @return {Ti.UI.Label}
 */
exports.createFieldLabel = function(properties) {
	return exports.createLabel(_.defaults(properties || {}, {
		color: color.label,
		font: { fontSize: 16 }
	}))	
}


/**
 * @method createButton
 * Creates a button, to fire events.
 * @param {Object} properties (optional) additional properties for the button
 * @return {Ti.UI.Button}
 */
exports.createButton = function(properties) {
	return Ti.UI.createButton(_.defaults(properties || {}, {
		borderRadius: 10
	}))
}