var _ = require('lib/underscore-1.4.2')._,
	color = {},
	darkerGray	= '#212021',
	darkGray	= '#4A4542',
	gray		= '#B5B6B5',
	//now some default colors just to use variables with everything
	white		= 'white',
	black		= 'black'

/**
 * @class UI.Colors
 * Defines common colors to be used by the interface components.
 * Uses different schemes depending on the current OS. 
 */

/** @property {String} bg window background */
/** @property {String} bgOp to be used as semi-transparent background ("shadow") for hovering windows */
/** @property {String} label field label */
/** @property {String} text common text */
/** @property {String} field.bg text field background */
/** @property {String} field.color text field font color */

switch (Titanium.Platform.name) {
	
	case 'android':
		color = {
			bg: black,
			bgOp: gray,
			label: white,
			text: darkGray,
			field: {
				bg: darkerGray,
				color: white
			}
		}
	break;
	
	case 'iPhone OS':
	case 'iPad OS':
	default:
		color = {
			bg: gray, //probably should be some kind of simple texture?
			bgOp: black,
			label: darkGray,
			text: darkGray,
			field: {
				bg: white,
				color: darkGray
			}
		}
	break;
	
}

_.extend(exports, color)