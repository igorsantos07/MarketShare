module.exports = function() {
	var ui = require("ui/common/components/all"),
		spacing = 20
	
	var win = ui.createWindow('newGroup', { navBarHidden: false } )
	
	var container = Ti.UI.createScrollView()
		var form = Ti.UI.createView({ width: '80%', layout: 'vertical' })
			
			var name = ui.createTextField()
			form.add(ui.createFieldLabel({ textid: 'name', top: spacing }))
			form.add(name)
			
			var btnSave = ui.createButton({
				top: spacing,
				width: '100%',
				titleid: 'createJoin'
			})
			form.add(btnSave)
		
		container.add(form)
	win.add(container)
	
	btnSave.addEventListener('click', function(e) {
		alert('Going to create the group named "'+name.value+'""')
		win.close()
	})
	
	return win
}