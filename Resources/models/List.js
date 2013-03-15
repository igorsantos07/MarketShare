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
function List (idOrProperties, callback) {
	
	/** Collection name
	 * @type {String} */
	this.COLLECTION = 'lists'
	
	/** Collection fields
	 * @property fields
	 * @protected
	 * @type {Array} */
	this.fields = [
		'id',
		'group',
		'name',
		'products',
		'status',
		'paid',
		'summary'
	]

	switch (typeof(idOrProperties)) {
		case 'string':
			if (idOrProperties.length == 24) { //pretty much reliable that this is a mongo ObjectID
				this.id = idOrProperties
				if (callback !== false && callback !== 0) {
					this.findById(this.id, function(data) {
						if (_.isFunction(callback)) callback(data)
					})
				}
			}
		break
		
		case 'object':
			this.setFields(idOrProperties)
			if (_.isFunction(callback)) callback(this)
		break
	}
		
}

_.extend(List.prototype, Model)

/** List of constants for statuses. The key is the value used in the database.
 * @property STATUSES
 * @static */
List.STATUS = {
	CLOSED	: 0,
	OPEN	: 1,
	SHOPPING: 2
}

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

List.prototype.addProduct = function(product, callback) {
	this.update({$push: { products: product }}, callback)
}

List.prototype.close = function(callback) {
	/*
	 * FIXME: should verify if all products have the prices before calling this method, or else it's useless
	 * TODO: should receive a list of bought products, since not always every product in the list is found in the market
	 */
	var calculateCosts = function(list, callback) {
		if (list.products && !_.isEmpty(list.products)) {
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

//TODO: Maybe all those overrides could be moved to the Model, using this.COLLECTION?

/** 
 * @method findById
 * @inheritdoc Models.Model#findById
 */
List.prototype.findById = function(id, callback) {
	Model.findById(this.COLLECTION, id, callback)
}

/** 
 * @method find
 * @inheritdoc Models.Model#find
 */
List.prototype.find = function(query, callback) {
	Model.find(this.COLLECTION, query, callback)
}

/** 
 * @method findAll
 * @inheritdoc Models.Model#findAll
 */
List.prototype.findAll = function(query, callback) {
	Model.findAll(this.COLLECTION, query, callback)
}

/** 
 * @method save
 * @inheritdoc Models.Model#save
 */
List.prototype.save = function(callback) {
	if (!this.name)
		this.name = this.defaultName()
		
	Model.save(this.COLLECTION, this, callback)
}

/** 
 * @method update
 * @inheritdoc Models.Model#update
 */
List.prototype.update = function(newData, callback) {
	if (!this.id) throw { type: 'ArgumentError', message: 'The model has no ID' }
	Model.update(this.COLLECTION, this.id, newData, callback)
}

List.prototype.remove = function(callback) {
	Model.remove(this.COLLECTION, this.id, callback)
}

module.exports = List