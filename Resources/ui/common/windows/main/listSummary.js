module.exports = function(args) {
	var _ = require('lib/underscore-1.4.2')._,
		ui = require('ui/common/components/all'),
		List = require('models/List'),	
		list = new List(args[0])
	
	var win = ui.createTabWindow('listSummary', { layout: 'vertical' })

		//TODO: html attr for iOS table rows probably won't work! we have to selectively remove the HTML here for iOS compat
		var rowFormat = _.template('<b><%=name%></b>: <%=price%>'),
			tableData = _.map(list.summary, function(user, id) {
				var line = ui.createTableViewRow(),
					text = ui.createLabel({
						height: 50,
						font: { fontSize: 20 },
						color: ui.color.label,
						html: rowFormat({
							name: user.firstName,
							price: String.formatCurrency(user.price)
						})
					})
				line.add(text)
				return line
			})
			
		var table = ui.createTableView({ data: tableData, top: 10 })
		
		win.add(table)
	
	return win
}