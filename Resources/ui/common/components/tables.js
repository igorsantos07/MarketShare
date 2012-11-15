var _ = require('lib/underscore-1.4.2')._,
	color = require('ui/common/components/colors')

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