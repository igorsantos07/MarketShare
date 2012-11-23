var _ = require('lib/underscore-1.4.2')._,
	Model = require('models/Model')

function User (idOrProperties) {

	switch (typeof(idOrProperties)) {
		case 'number':
			this.id = idOrProperties
		break
		
		case 'object':
			_.extend(this, idOrProperties)
		break
	}
		
}

_.extend(User.prototype, Model)

User.prototype.findById = function(id, callback) {
	Model.findById('users', id, callback)
}

User.prototype.find = function(query, callback) {
	Model.find('users', query, callback)
}

module.exports = User