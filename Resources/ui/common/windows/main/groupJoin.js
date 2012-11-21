module.exports = function() {
	var ui = require("ui/common/components/all"),
		spacing = 10
	
	var win = ui.createWindow('joinGroup', { navBarHidden: false } )
	
	var container = Ti.UI.createScrollView({ layout: 'vertical' })
		var form = Ti.UI.createView({ width: '90%', height: Ti.UI.SIZE, layout: 'horizontal', top: spacing, backgroundColor: 'transparent' })
			
			var name = ui.createTextField({ width: '60%', left: 0 })
			form.add(ui.createFieldLabel({ textid: 'searchFor', width: '100%', left: 0 }))
			form.add(name)
			
			var btnSearch = ui.createButton({
				titleid: 'search',
				width: '35%',
				left: spacing
			})
			form.add(btnSearch)
		
		container.add(form)
		
		var results = Ti.UI.createView({ width: '100%', height: Ti.UI.FILL, layout: 'vertical', top: spacing, visible: false })
			results.add(ui.createLabel({ textid: 'foundGroups', left: 10, color: ui.color.label, font: { fontSize: 20 }}))
			var list = ui.createTableView()
			results.add(list)
			
			results.visible = false
		container.add(results)
	win.add(container)
	
	btnSearch.addEventListener('click', function(e) {
		name.blur()
		list.data = []
		list.appendRow(ui.createTableViewRow({ title: "New Group 1" }))
		list.appendRow(ui.createTableViewRow({ title: "New Group 2" }))
		results.show()
	})
	
	return win
}