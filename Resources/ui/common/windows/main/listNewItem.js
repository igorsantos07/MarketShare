module.exports = function() {
	var ui = require("ui/common/components/all"),
		_ = require("lib/underscore-1.4.2")._,
		spacing = 20
	
	var bg = ui.createWindow('newItem', { opacity: 0.4, backgroundColor: ui.color.bgOp, navBarHidden: true })
	var win = Ti.UI.createView({ width: '85%', height: '90%', backgroundColor: ui.color.bg })
	
	var container = Ti.UI.createScrollView({showVerticalScrollIndicator: true})
		var form = Ti.UI.createView({ width: '90%', layout: 'horizontal' })
			
			form.add(ui.createLabel({ textid: 'newItem', width: '100%', color: ui.color.label, top: spacing / 2, font: { fontSize: 20 }}))
			
			var name = ui.createTextField({width: '100%'})
			form.add(ui.createFieldLabel({ textid: 'name', width: '100%', top: spacing }))
			form.add(name)
			
			form.add(ui.createFieldLabel({ textid: 'quantity', width: '45%', top: spacing }))
			form.add(ui.createFieldLabel({ textid: 'price', width: '45%', top: spacing, left: '10%' }))
			var quantity = ui.createTextField({width: '45%', keyboardType: Ti.UI.KEYBOARD_DECIMAL_PAD})
			form.add(quantity)
			var price = ui.createTextField({width: '45%', left: '10%', keyboardType: Ti.UI.KEYBOARD_DECIMAL_PAD})
			form.add(price)
			
			var category = ui.createSimplePicker(['cat1', 'cat2', 'cat3'], {}, true)
			form.add(ui.createFieldLabel({ textid: 'category', width: '100%', top: spacing }))
			form.add(category)
			
			//THIS SHOULD BE A LIST OF CHECKBOXES
			var owners = ['Lucas', 'Valter', 'Igor'],
				ownerChecks = []
			form.add(ui.createFieldLabel({ textid: 'ownerss', width: '100%', top: spacing }))
			_.each(owners, function(owner, i) {
				ownerChecks[i] = ui.createCheckbox(owner, { right: 5 }, true)  
				form.add(ownerChecks[i])
			})
			
			var btnSave = ui.createButton({
				top: spacing,
				bottom: spacing / 2,
				width: '100%',
				titleid: 'add'
			})
			form.add(btnSave)
		
		container.add(form)
	win.add(container)
	
	bg.add(win)
	bg.realWindow = win
	
	btnSave.addEventListener('click', function(e) {
		alert('Going to add an item to the list.')
		win.close()
	})
	
	/**
	 * add back button behavior
	 */
	
	return bg
}