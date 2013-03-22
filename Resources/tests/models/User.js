var User = require('models/User')

describe('The user model', function() {
	var user, promise, insertedPk
	
	/**
	 * @param {Object} promiser Should put a promise in {@link promise}
	 * @param {Object} expectations Should run expect() tests
	 */
	function promiseTest(promiser, expectations) {
		runs(promiser)
		
		waitsFor(function() {
			return !promise.isPending()
		}, 'Request should have finished', 5000)
		
		runs(expectations)
	}
	
	function validateUser(user, rawId, skipProperties) {
		var id		= rawId? user._id.$oid : user.id,
			notId	= !rawId? user._id.$oid : user.id
		
		expect(user.name)	.toBeDefined()
		expect(user.email)	.toBeDefined()
		
		expect(id).toBeDefined()
		expect(notId).not.toBeDefined()
		
		if (!skipProperties) {
			expect(user.name).toEqual('test')
			expect(user.email).toEqual('test07@gmail.com')
			expect(id).toMatch(/[\w\d]{24}/)
		}	
		
	}
	
	afterEach(function () {
		user = undefined
		promise = undefined
	})

	it('should save', function() { promiseTest(
		function() {
			promise = User.saveData({
				name: 'test',
				email: 'test07@gmail.com'
			})
			.then(function(userData) {
				user = userData
			})
		},
		function() {
			validateUser(user, true)
			expect(insertedPk = user._id.$oid).toBeTruthy()
		}
	)})

	it('should find', function() { promiseTest(
		function() {
			promise = Q.all([
				User.find({name: 'test'}),
				User.findById(insertedPk),
				User.findAll()
			])
			.spread(function(userFind, userfindById, userFindAll) {
				user = {
					find: userFind,
					findById: userfindById,
					findAll: userFindAll
				}
			})
		},
		function() {
			validateUser(user.find, true)
			validateUser(user.findById, true)			
			
			expect(user.findAll).toEqual(jasmine.any(Array))
			user.findAll.forEach(function(user) {
				validateUser(user, true, true)
			})
		}
	)})
	
	
	
	/********
	 
	
	/-**
	 * @param {Object} promiser Should put a promise in {@link promise}
	 * @param {Object} expectations Should run expect() tests
	 *-/
	var promiseTest = function(promiser, expectations) {
		runs(promiser)
		
		waitFor(function() {
			return !promise.isPending()
		}, 'Request should have finished', 5000)
		
		runs(expectations)
	}
	
	afterEach(function () {
		user = undefined
		promise = undefined
	})

	it('should save', promiseTest(
		function() {
			promise = User.saveData({
				name: 'test',
				email: 'test07@gmail.com'
			})
			.then(function(userData) {
				user = userData
			})
		},
		function() {
			
		}
	)) 
	 */
	
	
	
	
	
})
/*
var user = new User()	
user.name = 'testing'
user.email = 'test07@gmail.com'


User.count()

.then(function(total) {
	Ti.API.error("=======================> Current users: "+total)
	return true
})

.then(function() {
		Ti.API.error("===========> STARTING TESTS <===========")
		
		return Q.all([
			User.find({email: 'igorsantos07@gmail.com' })
			.then(function(user) {
				return (
					user._id.$oid == '50c753bfa6a188c0e7b678b2' &&
					user.name == 'Igor' &&
					user.email == 'igorsantos07@gmail.com'
				)
			}),
			
			User.findById('50c753bfa6a188c0e7b678b2')
			.then(function(user) {
				return (
					user._id.$oid == '50c753bfa6a188c0e7b678b2' &&
					user.name == 'Igor' &&
					user.email == 'igorsantos07@gmail.com'
				)
			}),
			
			User.findAll({email: 'test07@gmail.com' })
			.then(function(users) {
				if (users.length > 0) {
					users.forEach(function(user) {
						Ti.API.error("===========> FindAll: "+user._id.$oid+' - '+user.name+':'+user.email)	
					})
				}
				else {
					Ti.API.error("===========> FindAll: none")
				}
				return true
			}),
			
			User.construct('50c753bfa6a188c0e7b678b2')
			.then(function(user) {
				return (
					user.id == '50c753bfa6a188c0e7b678b2' &&
					user.name == 'Igor' &&
					user.email == 'igorsantos07@gmail.com'
				)
			}),
			
			
			}),
			
			User.updateData('50c753bfa6a188c0e7b678b2', {name: 'Igor Santos'})
			.then(function(user) {
				return (
					user.name == 'Igor Santos' &&
					user.email == 'igorsantos07@gmail.com' &&
					user.id == undefined &&
					user._id.$oid == '50c753bfa6a188c0e7b678b2'
				)
			}),
			
			user.save()
			.then(function(saved) {
				return (
					saved.name == 'testing' &&
					saved.email == 'test07@gmail.com' &&
					!_.empty(user.id)
				)
			})
			.then(function() {
				user.name = 'update'+_.random(100)
				return user.update()
			})
			.then(function(saved) {
				Ti.API.error("===========> Update: "+saved.name)
				Ti.API.error("===========> Updated: "+user.id)
				return true
			}),
			
		])
		
		
		.then(function(results) {
			results.forEach(function(result, index) {
				if (result === false)
					Ti.API.error("===========> Test error: "+index)
			})
		})

})

.then(function() {
	Ti.API.error("===========> CLEANING TESTS <===========")
		
	return Q.all([
		User.updateData('50c753bfa6a188c0e7b678b2', { '$set': {
			name: 'Igor',
			email: 'igorsantos07@gmail.com'
		}}),
		
		User.remove({email: 'test07@gmail.com'})			
	])
	.spread(function(update, remove) {
		if (update) Ti.API.error("===========> Default user fixed: "+update.name)
		if (remove) Ti.API.error("===========> All test users removed: "+remove.removed)
		return true
	})
})

.then(function() {
	return User.count().then(function(total) {
		Ti.API.error("=======================> Current users: "+total)
		return true
	})
})

.fail(function (error) {
	Ti.API.error("=======================> BANG BANG BANG")
	Ti.API.error(JSON.stringify(error))
})

}
*/