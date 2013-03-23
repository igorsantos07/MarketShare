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
function Group () {

}

var modelData = {
	COLLECTION: 'groups',
	fields: [
		'id',
		'name',
		'users',
		'lists'
	]
}

_.extend(Group, _.omit(Model, 'save', 'update'), modelData)
_.extend(Group.prototype, Model, modelData)

module.exports = Group