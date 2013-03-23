var Group = require('models/Group')

describe('The Group model', function() {
	var data, promise, insertedId
	
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
	
	function validateGroup(data, rawId, skipProperties) {
		var id = rawId? data._id.$oid : data.id,
			notId = !rawId? data._id : data.id
		
		expect(data.name)	.toBeDefined()
		
		expect(id).toBeDefined()
		expect(notId).not.toBeDefined()
		
		if (!skipProperties) {
			expect(data.name).toEqual('jasmine_test')
			expect(id).toMatch(/[\w\d]{24}/)
		}	
		
	}
	
	afterEach(function () {
		data = undefined
		promise = undefined
	})

	it('should save', function() { promiseTest(
		function() {
			promise = Q.all([
				Group.saveData({name: 'jasmine_test'}),
				(function() {
					saved = new Group()
					saved.name = 'jasmine_test'
					return saved.save()
				})()
			])
			.spread(function(rawGroup, savedGroup) {
				data = {
					raw: rawGroup,
					saved: savedGroup
				}
			})
		},
		function() {
			validateGroup(data.raw, true)
			validateGroup(data.saved, false)
			expect(insertedId = data.saved.id).toBeTruthy()
		}
	)})

	it('should find', function() { promiseTest(
		function() {
			promise = Q.all([
				Group.find({name: 'jasmine_test'}),
				Group.findById(insertedId),
				Group.findAll()
			])
			.spread(function(dataFind, datafindById, dataFindAll) {
				data = {
					find: dataFind,
					findById: datafindById,
					findAll: dataFindAll
				}
			})
		},
		function() {
			validateGroup(data.find, true)
			validateGroup(data.findById, true)
			
			expect(data.findAll).toEqual(jasmine.any(Array))
			data.findAll.forEach(function(data) {
				validateGroup(data, true, true)
			})
		}
	)})

	it('should build itself', function() { promiseTest(
		function() {
			promise = Group.construct(insertedId)
			.then(function(foundGroup) { data = foundGroup })
		},
		function() { validateGroup(data, false) }
	)})
	
	it('should be able to count', function() { promiseTest(
		function() {
			promise = Group.count().then(function(total) { data = total })
		},
		function() {
			expect(data).toEqual(jasmine.any(Number))
			expect(data).toBeGreaterThan(0)
		}
	)})
	
	it('should update', function() { promiseTest(
		function() {
			promise = Q.all([
				Group.updateData(insertedId, { name: 'jasmine_testing' }),
				(function() {
					return Group.construct(insertedId).then(function(updated) {
						updated.name = 'jasmine_testing 2'
						return updated.update()
					})
				})()
			])
			.spread(function(rawGroup, updatedGroup) {
				data = {
					raw: rawGroup,
					updated: updatedGroup
				}
			})
		},
		function() {
			validateGroup(data.raw, true, true)
			expect(data.raw.name).toEqual('jasmine_testing')
			
			validateGroup(data.updated, false, true)
			expect(data.updated.name).toEqual('jasmine_testing 2')
		}
	)})
	
	it('should remove stuff', function() { promiseTest(
		function() {
			promise = Q.all([
				Group.remove(insertedId),
				Q.all([
					Group.saveData({ name: 'removeable' }),
					Group.saveData({ name: 'removeable' }),
					Group.saveData({ name: 'removeable' })
				]).then(function() { return Group.remove({ name:'removeable' }) })
			])
			.spread(function(removeOne, removeMany) {
				data = {
					one: removeOne,
					many: removeMany
				}
			})
		},
		function() {
			expect(data.one.name).toMatch(/jasmine_test.*/)
			expect(data.many.removed).toEqual(3)
		}
	)})
	
	it('should clean test data', function() { promiseTest(
		function() {
			promise = Group.remove({name: 'jasmine_test'})
			.then(function(removed) { data = removed })
		},
		function() {
			expect(data.removed).toEqual(1)
		}
	)})
})