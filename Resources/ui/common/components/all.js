var _ = require('lib/underscore-1.4.2')._

var parts = ['forms', 'tables', 'windows']

for (i in parts) {
	var components = require('ui/common/components/'+parts[i])
	_.extend(exports, components)
}

exports.color = require('ui/common/components/colors')
alert(exports.color.label)
