var _ = require('lib/underscore-1.4.2')._,
	Model = require('models/Model'),
	Group = require('models/Group')
	
/**
 * @class Models.List
 * @extends Models.Model
 * Implementation of "lists" collection.
 * Holds products to be bought, and should belongs to a {@link Models.Group}.
 * 
 * @constructor
 * Creates a List object based on an ID or an Object with the fields
 * @param {String/Object} idOrProperties List ID or object properties. If ID, does a {@link Models.List#find};
 *        if property, calls {@link Models.Model#setFields}
 * @param {Function/boolean} callback (optional) A function to be called after {@link Models.List#find}
 * or {@link Models.Model#setFields}. If `false`, will not try to fill the missing fields with a find call.
 */
function List () {

}

var modelData = {
	COLLECTION: 'lists',
	fields:  [
		'id',
		'group',
		'name',
		'products',
		'status',
		'paid',
		'summary'
	],
	
	/** List of constants for statuses. The key is the value used in the database.
	 * @property STATUSES
	 * @static */
	STATUS: {
		CLOSED	: 0,
		OPEN	: 1,
		SHOPPING: 2
	}
}

_.extend(List, _.omit(Model, 'save', 'update'), modelData)
_.extend(List.prototype, Model, modelData)


/**
 * @method defaultName
 * Generates a default name for the list, to be used if none is given
 * when creating a new one.
 * @return {String} A date string in the format MM-DD HH:MM:SS
 */
List.prototype.defaultName = function() {
	var date = new Date(),
		min = date.getMinutes(),
		sec = date.getSeconds()
		
	return [/*date.getFullYear(), */date.getMonth()+1, date.getDate()].join('-') //with year the name is too long to fit in the title bar
	        +' '+
		    [date.getHours(), (min < 10)? '0'+min : min, (sec < 10)? '0'+sec : sec].join(':')
}

List.prototype.addProduct = function(product) {
	return this.update({$push: { products: product }})
}

// TODO: remove callback from here and implement promisses
List.prototype.close = function(callback) {
	/*
	 * FIXME: should verify if all products have the prices before calling this method, or else it's useless
	 * TODO: should receive a list of bought products, since not always every product in the list is found in the market
	 */
	var calculateCosts = function(list, callback) {
		if (list.products && !_.isEmpty(list.products)) {
			//FIXME: related to #104: no natural list has group yet, so the callback is not called and the calculation is never over
			var group = new Group(list.group, function(group) {
				costs = {}
				_.each(group.users, function(user) {
					costs[user.id.$oid] = { price: 0, firstName: user.firstName, lastName: user.lastName }
				})
				
				_.each(list.products, function(product) {
					var owners = {}
					if (product.owners && !_.isEmpty(product.owners)) {
						owners = product.owners	
					}
					else {
						var qtdPerUser = product.quantity / group.users.length
						_.each(group.users, function(user) {
							owners.push({
								user: { $oid: user.$oid },
								quantity: qtdPerUser
							})
						})
					}
					
					_.each(owners, function(owner) {
						costs[owner.id.$oid].price += product.price * owner.quantity
					})
				})
					
				list.update({ summary: costs }, callback)
			})
		}
	}
	
	if (this.status == List.STATUS.CLOSED)
		calculateCosts(this, callback)
	else
		this.update({ status: List.STATUS.CLOSED }, function(newData) {
			this.setFields(newData)
			calculateCosts(this, callback)
		})
}

module.exports = List