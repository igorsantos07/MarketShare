var _ = require('lib/underscore-1.4.2')._,
	Model = require('models/Model')
	
/**
 * @class List
 * @extends Model
 * Implementation of "lists" collection.
 * Holds products to be bought, and should belongs to a {@link Group}.
 * 
 * @constructor
 * Creates a List object based on an ID or an Object with the fields
 * @param {String/Object} idOrProperties List ID or object properties. If ID, does a {@link List#find};
 * 		if property, calls {@link Model#setFields}
 * @param {Function} callback (optional) to be called after {@link List#find} or {@link Model#setFields}
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
		'name',
		'products',
		'closed',
		'paid'
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

_.extend(List.prototype, Model)

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

//TODO: Maybe all those overrides could be moved to the Model, using this.COLLECTION?

/** 
 * @method findById
 * @inheritdoc Model#findById
 */
List.prototype.findById = function(id, callback) {
	Model.findById(this.COLLECTION, id, callback)
}

/** 
 * @method find
 * @inheritdoc Model#find
 */
List.prototype.find = function(query, callback) {
	Model.find(this.COLLECTION, query, callback)
}

/** 
 * @method findAll
 * @inheritdoc Model#findAll
 */
List.prototype.findAll = function(query, callback) {
	Model.findAll(this.COLLECTION, query, callback)
}

/** 
 * @method save
 * @inheritdoc Model#save
 */
List.prototype.save = function(callback) {
	if (!this.name)
		this.name = this.defaultName()
		
	Model.save(this.COLLECTION, this, callback)
}

module.exports = List