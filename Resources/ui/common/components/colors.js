var _ = require('lib/underscore-1.4.2')._,
	color = {},
	darkerGray	= '#212021',
	darkGray	= '#4A4542',
	gray		= '#B5B6B5',
	//now some default colors just to use variables with everything
	white		= 'white',
	black		= 'black'

switch (Titanium.Platform.name) {
	
	case 'android':
		color = {
			bg: black,
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