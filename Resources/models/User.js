var _ = require('lib/underscore-1.4.2')._,
	Model = require('models/Model')
	
/**
 * @class User
 * @member Models
 * Implementation of "users" collection
 * 
 * @constructor
 * Creates a User object based on an ID or an Object with the fields
 * @param {String/Object} idOrProperties User ID or object properties. If ID, does a {@link User#find};
 * 		if property, calls {@link Model#setFields}
 * @param {Function} callback to be called after {@link User#find} or {@link Model#setFields}
 */
(function User (idOrProperties, callback) {
	
	this.COLLECTION = 'users'
	
	this.fields = [
		'id',
		'name',
		'surname',
		'email',
		'password'
	]

	switch (typeof(idOrProperties)) {
		case 'string':
			if (idOrProperties.length == 24) { //pretty much reliable that this is a mongo ObjectID
				this.id = idOrProperties
				this.findById(this.id, function(data) {
					if (_.isFunction(callback))
						callback(data)
				})
			}
		break
		
		case 'object':
			this.setFields(idOrProperties)
			if (_.isFunction(callback)) callback(this)
		break
	}
		
})()

_.extend(User.prototype, Model)

//TODO: Maybe all those overrides could be moved to the Model, using this.COLLECTION?

/** 
 * @method findById
 * @inheritdoc Model#findById
 */
User.prototype.findById = function(id, callback) {
	Model.findById(this.COLLECTION, id, callback)
}

/** 
 * @method find
 * @inheritdoc Model#find
 */
User.prototype.find = function(query, callback) {
	Model.find(this.COLLECTION, query, callback)
}

/** 
 * @method findAll
 * @inheritdoc Model#findAll
 */
User.prototype.findAll = function(query, callback) {
	Model.findAll(this.COLLECTION, query, callback)
}

/** 
 * @method save
 * @inheritdoc Model#save
 */
User.prototype.save = function(callback) {
	Model.save(this.COLLECTION, this, callback)
}

module.exports = User