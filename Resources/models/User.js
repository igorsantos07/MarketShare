var _ = require('lib/underscore-1.4.2')._,
	Model = require('models/Model')

function User (idOrProperties, callback) {
	
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
		
}

_.extend(User.prototype, Model)

//TODO: Maybe all those overrides could be moved to the Model, using this.COLLECTION?

User.prototype.findById = function(id, callback) {
	Model.findById(this.COLLECTION, id, callback)
}

User.prototype.find = function(query, callback) {
	Model.find(this.COLLECTION, query, callback)
}

User.prototype.findAll = function(query, callback) {
	Model.findAll(this.COLLECTION, query, callback)
}

User.prototype.save = function(callback) {
	Model.save(this.COLLECTION, this, callback)
}

module.exports = User