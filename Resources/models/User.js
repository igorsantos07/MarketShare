var _ = require('lib/underscore-1.4.2')._,
	Model = require('models/Model')
	
/**
 * @class Models.User
 * @extends Models.Model
 * Implementation of "users" collection.
 * Representation of an app user in the database. Should have a {@link Models.Group}.
 * 
 * @constructor
 * Creates a User object based on an ID or an Object with the fields
 * @param {String/Object} idOrProperties User ID or object properties. If ID, does a {@link Models.User#find};
 * 		if property, calls {@link Models.Model#setFields}
 * @param {Function} callback (optional) to be called after {@link Models.User#find} or {@link Models.Model#setFields}
 */
function User (idOrProperties, callback) {
	
	/** Collection name
	 * @type {String} */
	this.COLLECTION = 'users'
	
	/** Collection fields
	 * @property fields
	 * @protected
	 * @type {Array} */
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
		
}

_.extend(User.prototype, Model)

//TODO: Maybe all those overrides could be moved to the Model, using this.COLLECTION?

/** 
 * @method findById
 * @inheritdoc Models.Model#findById
 */
User.prototype.findById = function(id, callback) {
	Model.findById(this.COLLECTION, id, callback)
}

/** 
 * @method find
 * @inheritdoc Models.Model#find
 */
User.prototype.find = function(query, callback) {
	Model.find(this.COLLECTION, query, callback)
}

/** 
 * @method findAll
 * @inheritdoc Models.Model#findAll
 */
User.prototype.findAll = function(query, callback) {
	Model.findAll(this.COLLECTION, query, callback)
}

/** 
 * @method save
 * @inheritdoc Models.Model#save
 */
User.prototype.save = function(callback) {
	Model.save(this.COLLECTION, this, callback)
}

module.exports = User