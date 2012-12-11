var _ = require('lib/underscore-1.4.2')._,
	Model = require('models/Model')
	
/**
 * @class Models.Group
 * @extends Models.Model
 * Implementation of "groups" collection.
 * Representation of a group of {@link Models.User users}, sharing expenses.
 * 
 * @constructor
 * Creates a Group object based on an ID or an Object with the fields
 * @param {String/Object} idOrProperties Group ID or object properties. If ID, does a {@link Models.Group#find};
 * 		if property, calls {@link Models.Model#setFields}
 * @param {Function} callback (optional) to be called after {@link Models.Group#find} or {@link Models.Model#setFields}
 */
function Group (idOrProperties, callback) {
	
	/** Collection name
	 * @type {String} */
	this.COLLECTION = 'groups'
	
	/** Collection fields
	 * @property fields
	 * @protected
	 * @type {Array} */
	this.fields = [
		'id',
		'name',
		'users',
		'lists'
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


_.extend(Group.prototype, Model)

//TODO: Maybe all those overrides could be moved to the Model, using this.COLLECTION?

/** 
 * @method findById
 * @inheritdoc Models.Model#findById
 */
Group.prototype.findById = function(id, callback) {
	Model.findById(this.COLLECTION, id, callback)
}

/** 
 * @method find
 * @inheritdoc Models.Model#find
 */
Group.prototype.find = function(query, callback) {
	Model.find(this.COLLECTION, query, callback)
}

/** 
 * @method findAll
 * @inheritdoc Models.Model#findAll
 */
Group.prototype.findAll = function(query, callback) {
	Model.findAll(this.COLLECTION, query, callback)
}

/** 
 * @method save
 * @inheritdoc Models.Model#save
 */
Group.prototype.save = function(callback) {
	Model.save(this.COLLECTION, this, callback)
}

module.exports = Group