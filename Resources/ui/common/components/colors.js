var _ = require('lib/underscore-1.4.2')._,
	color = {},
	darkerGray		= '#212021',
	darkGray		= '#404040',
	lightDarkGray	= '#494949',
	gray			= '#B5B5B5',
	//now some default colors just to use variables with everything
	white			= '#F7F7F7',
	black			= '#000000'

/**
 * @class UI.Colors
 * Defines common colors to be used by the interface components.
 * Uses different schemes depending on the current OS. 
 */

/** @property {String} bg window background */
/** @property {String} bgOp semi-transparent stage for modal windows */
/** @property {String} bgModal background of modal windows */
/** @property {String} label field label */
/** @property {String} text common text */
/** @property {String} field.bg text field background */
/** @property {String} field.bgModal modal text field background */
/** @property {String} field.color text field font color */

switch (Titanium.Platform.name) {
	
	case 'android':
		color = {
			bg: black,
			bgOp: black,
			bgModal: '#292829',
			label: white,
			text: lightDarkGray,
			field: {
				bg: darkerGray,
				color: white,
				bgModal: darkGray
			}
		}
	break;
	
	case 'iPhone OS':
	case 'iPad OS':
	default:
		color = {
			bg: gray, //probably should be some kind of simple texture?
			bgOp: black,
			bgModal: darkerGray,
			label: lightDarkGray,
			text: lightDarkGray,
			field: {
				bg: white,
				color: lightDarkGray,
				bgModal: white
			}
		}
	break;
	
}

_.extend(exports, color)