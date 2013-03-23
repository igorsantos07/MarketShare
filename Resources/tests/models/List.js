var List = require('models/List')

/**
 * 
 * Lacks testing of additional, non-Model methods, such as addProduct() and close()
 * 
 */
describe('The List model', function() {
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
	
	function validateList(data, rawId, skipProperties) {
		var id = rawId? data._id.$oid : data.id,
			notId = !rawId? data._id : data.id
		
		expect(data.name)	.toBeDefined()
		expect(data.status)	.toBeDefined()
		
		expect(id).toBeDefined()
		expect(notId).not.toBeDefined()
		
		if (!skipProperties) {
			expect(data.name).toEqual('jasmine_test')
			expect(data.status).toEqual(List.STATUS.OPEN)
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
				List.saveData({ name: 'jasmine_test', status: List.STATUS.OPEN }),
				(function() {
					saved = new List()
					saved.name = 'jasmine_test'
					saved.status = List.STATUS.OPEN
					return saved.save()
				})()
			])
			.spread(function(rawList, savedList) {
				data = {
					raw: rawList,
					saved: savedList
				}
			})
		},
		function() {
			validateList(data.raw, true)
			validateList(data.saved, false)
			expect(insertedId = data.saved.id).toBeTruthy()
		}
	)})

	it('should find', function() { promiseTest(
		function() {
			promise = Q.all([
				List.find({name: 'jasmine_test'}),
				List.findById(insertedId),
				List.findAll()
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
			validateList(data.find, true)
			validateList(data.findById, true)
			
			expect(data.findAll).toEqual(jasmine.any(Array))
			data.findAll.forEach(function(data) {
				validateList(data, true, true)
			})
		}
	)})

	it('should build itself', function() { promiseTest(
		function() {
			promise = List.construct(insertedId)
			.then(function(foundList) { data = foundList })
		},
		function() { validateList(data, false) }
	)})
	
	it('should be able to count', function() { promiseTest(
		function() {
			promise = List.count().then(function(total) { data = total })
		},
		function() {
			expect(data).toEqual(jasmine.any(Number))
			expect(data).toBeGreaterThan(0)
		}
	)})
	
	it('should update', function() { promiseTest(
		function() {
			promise = Q.all([
				List.updateData(insertedId, { name: 'jasmine_testing' }),
				(function() {
					return List.construct(insertedId).then(function(updated) {
						updated.name = 'jasmine_testing 2'
						return updated.update()
					})
				})()
			])
			.spread(function(rawList, updatedList) {
				data = {
					raw: rawList,
					updated: updatedList
				}
			})
		},
		function() {
			validateList(data.raw, true, true)
			expect(data.raw.name).toEqual('jasmine_testing')
			expect(data.raw.status).toEqual(List.STATUS.OPEN)
			
			validateList(data.updated, false, true)
			expect(data.updated.name).toEqual('jasmine_testing 2')
			expect(data.updated.status).toEqual(List.STATUS.OPEN)
		}
	)})
	
	it('should remove stuff', function() { promiseTest(
		function() {
			promise = Q.all([
				List.remove(insertedId),
				Q.all([
					List.saveData({ name: 'removeable' }),
					List.saveData({ name: 'removeable' }),
					List.saveData({ name: 'removeable' })
				]).then(function() { return List.remove({ name:'removeable' }) })
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
			promise = List.remove({name: 'jasmine_test'})
			.then(function(removed) { data = removed })
		},
		function() {
			expect(data.removed).toEqual(1)
		}
	)})
})