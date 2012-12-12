/**
 * @class Windows.Main.ListNewItem
 * New item modal window.
 * 
 * @constructor
 * @param {Array} params Should contain the following items:  
 * 0. the list ID  
 * 1. the parent window (that contains the product's table and an event `addItem`)  
 * 
 * @return {Ti.UI.View}
 */
module.exports = function(params) {
	var _ = require("lib/underscore-1.4.2")._,
		ui = require("ui/common/components/all"),
		List = require('models/List'),
		spacing = 20,
		listId = params[0],
		parent = params[1]
	
	ui.color.field.bg = ui.color.field.bgModal
	
	var win = ui.createModalWindow('newItem')
	
	var container = Ti.UI.createScrollView({top: spacing / 2, showVerticalScrollIndicator: true})
		var form = Ti.UI.createView({ width: '90%', layout: 'horizontal' })
			var name = ui.createTextField({width: '100%'})
			form.add(ui.createFieldLabel({ textid: 'name', width: '100%', top: spacing }))
			form.add(name)
			
			form.add(ui.createFieldLabel({ textid: 'quantity', width: '45%', top: spacing }))
			form.add(ui.createFieldLabel({ textid: 'price', width: '45%', top: spacing, left: '10%' }))
			var quantity = ui.createTextField({width: '45%', value: '1', keyboardType: Ti.UI.KEYBOARD_DECIMAL_PAD})
			form.add(quantity)
			var price = ui.createTextField({width: '45%', left: '10%', keyboardType: Ti.UI.KEYBOARD_DECIMAL_PAD})
			form.add(price)
			ui.selectOnFocus(quantity)
			ui.selectOnFocus(price)
			
			var category = ui.createSimplePicker(['cat1', 'cat2', 'cat3'], {}, true)
			form.add(ui.createFieldLabel({ textid: 'category', width: '100%', top: spacing }))
			form.add(category)
			
			var owners = [
				{name: 'Lucas', id: 10},
				{name: 'Valter', id: 5},
				{name: 'Igor', id: 457}	
			],
				ownerChecks = []
			form.add(ui.createFieldLabel({ textid: 'ownerss', width: '100%', top: spacing }))
			_.each(owners, function(owner, i) {
				ownerChecks[i] = ui.createCheckbox(owner.name, { right: 5, ownerId: owner.id }, true)  
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
	
	btnSave.addEventListener('click', function(e) {
		var list = new List(listId, false),
			product = {
				name: name.value,
				quantity: parseInt(quantity.value) || 1,
				price: parseFloat(price.value) || undefined,
				category: category.getSelectedRow(0).title
			}
			product.owners = _(ownerChecks)
				.filter(function(check) { return check.value })
				.map(function(owner) { return { owner: owner.title, id: owner.ownerId, quantity: product.quantity }})
		
		list.addProduct(product, function(list) {
			parent.fireEvent('productAdded', product)
			win.close()
		})
	})

	return win
}