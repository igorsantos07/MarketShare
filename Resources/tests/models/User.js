var User = require('models/User')

describe('The User model', function() {
	var user, promise, insertedId
	
	/**
	 * @param {Object} promiser Should put a promise in {@link promise}
	 * @param {Object} expectations Should run expect() tests
	 */
	function promiseTest(promiser, expectations) {
		runs(promiser)
		
		waitsFor(function() {
			return !promise.isPending()
		}, 'Request should have finished', 6000)
		
		runs(expectations)
	}
	
	function validateUser(user, rawId, skipProperties) {
		var id = rawId? user._id.$oid : user.id,
			notId = !rawId? user._id : user.id
		
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
			promise = Q.all([
				User.saveData({
					name: 'test',
					email: 'test07@gmail.com'
				}),
				(function() {
					saved = new User()
					saved.name = 'test'
					saved.email = 'test07@gmail.com'
					return saved.save()
				})()
			])
			.spread(function(rawUser, savedUser) {
				user = {
					raw: rawUser,
					saved: savedUser
				}
			})
		},
		function() {
			validateUser(user.raw, true)
			validateUser(user.saved, false)
			expect(insertedId = user.saved.id).toBeTruthy()
		}
	)})

	it('should find', function() { promiseTest(
		function() {
			promise = Q.all([
				User.find({name: 'test'}),
				User.findById(insertedId),
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

	it('should build itself', function() { promiseTest(
		function() {
			promise = User.construct(insertedId)
			.then(function(foundUser) { user = foundUser })
		},
		function() { validateUser(user, false) }
	)})
	
	it('should be able to count', function() { promiseTest(
		function() {
			promise = User.count().then(function(total) { user = total })
		},
		function() {
			expect(user).toEqual(jasmine.any(Number))
			expect(user).toBeGreaterThan(0)
		}
	)})
	
	it('should update', function() { promiseTest(
		function() {
			promise = Q.all([
				User.updateData(insertedId, { name: 'testing' }),
				(function() {
					return User.construct(insertedId).then(function(updated) {
						updated.name = 'testing 2'
						return updated.update()
					})
				})()
			])
			.spread(function(rawUser, updatedUser) {
				user = {
					raw: rawUser,
					updated: updatedUser
				}
			})
		},
		function() {
			validateUser(user.raw, true, true)
			expect(user.raw.name).toEqual('testing')
			expect(user.raw.email).toEqual('test07@gmail.com')
			
			validateUser(user.updated, false, true)
			expect(user.updated.name).toEqual('testing 2')
			expect(user.updated.email).toEqual('test07@gmail.com')
		}
	)})
	
	it('should remove stuff', function() { promiseTest(
		function() {
			promise = Q.all([
				User.remove(insertedId),
				Q.all([
					User.saveData({ name: 'removeable', email: 'remove@gmail.com' }),
					User.saveData({ name: 'removeable', email: 'remove@gmail.com' }),
					User.saveData({ name: 'removeable', email: 'remove@gmail.com' })
				]).then(function() { return User.remove({ email: 'remove@gmail.com' }) })
			])
			.spread(function(removeOne, removeMany) {
				user = {
					one: removeOne,
					many: removeMany
				}
			})
		},
		function() {
			expect(user.one.email).toEqual('test07@gmail.com')
			expect(user.many.removed).toEqual(3)
		}
	)})
	
	it('should clean test data', function() { promiseTest(
		function() {
			promise = User.remove({email:'test07@gmail.com'})
			.then(function(removed) { user = removed })
		},
		function() {
			expect(user.removed).toEqual(1)
		}
	)})
})