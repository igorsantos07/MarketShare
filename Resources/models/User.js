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
function User () {
	
}

var modelData = {
	COLLECTION: 'users',
	fields: [
		'id',
		'name',
		'surname',
		'email',
		'password'
	]
}

_.extend(User, _.omit(Model, 'save', 'update'), modelData)
_.extend(User.prototype, Model, modelData)

module.exports = User