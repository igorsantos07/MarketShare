var config = require('config/database'),
	_ = require('lib/underscore-1.4.2')._

/**
 * @class Model
 * @member Models
 * 
 * To interact with a collection you should use the following URL, and call
 * it with the given verb. All non-GET requests should specify a JSON in the body.
 * You should also add a query-string argument apiKey with the user's key.
 * 
 * # Base Data
 * 
 * * **URL**: http://api.mongolab.com/api/1/databases/`«database»`/collections/`«collection»`/
 * * **Header**: Content-Type: application/json;charset=utf-8
 * 
 * # MongoLab API Actions
 * 
 * ## Plain Actions
 * * **Insert** `[POST]` no queryString
 *     * sample body: *(one object or array)*
 * 
 * ## Identifiable Actions
 * The following methods have two ways to be used: using a simple trailing slash in
 * the end or adding the object `_id`. With the `_id` you won't use any queryString parameters.
 * 
 * * **Find All** `[GET]`
 *     * args: q,c,f,fo,s,sk,l
 *     * sample body: *«empty»*
 * * **Replace** `[PUT]`
 *     * args: q
 *     * sample body: *(one object or array)*
 * * **Update** `[PUT]`
 *     * args: q,m,u
 *     * sample body: `{ "$set": { "x": 3 } }`
 * * **Delete**
 *     * `[PUT]`
 *         * args: q
 *         * sample body: `{ }` *«always an empty object»*
 *     * `[DELETE]`, no queryString
 *         * notes: URL requires «id» part
 * 
 * ## Query-string arguments
 * * `q=«string»`  - restrict results by the specified JSON {query}
 * * `c=«bool»`    - return the result {count} for this query
 * * `f=«string»`  - specify the set of {fields} to include or exclude in each document (1 - include; 0 - exclude)
 * * `fo=«bool»`   - return a single document from the result set (same as {findOne}() using the mongo shell
 * * `s=«number»`  - specify the order in which to {sort} each specified field (1: ascending; -1: descending)
 * * `sk=«number»` - specify the number of results to {skip} in the result set; useful for paging
 * * `l=«number»`  - specify the {limit} for the number of results (default is 1000)
 * 
 * ## Returned Status Codes
 * * 200 - Worked
 * * 201 - Created *(turns out that the 1.0 API don't return this code when a new entry is created; it does return 200)*
 * * 400 - Misformatted data
 * * 401 - Wrong credentials
 * * 403 - Denied permission
 * * 404 - Wrong URL
 * * 405 - Wrong verb
 * * 415 - Lack of header `Content-Type: application/json;charset=utf-8`
 */
module.exports = {
	/** Used internally to generate the final request URL
	 * @type {Function} 
	 * @private */
	_URL: _.template('https://api.mongolab.com/api/1/databases/marketshare/collections/<%=collection%>/<%=id%>?<%=queryString%>&apiKey='+config.API_KEY),
	
	/** Default timeout */
	TIMEOUT: 5000,
	
	/** Constants for each type of Request the API should understand */
	REQUEST: {
		INSERT:  0,	//C
		FIND:    1,	//R
		UPDATE:  2,	//U
		REPLACE: 3,	//U
		DELETE:  4	//D
	},
	
	/** Should be overriden by the upper models to list its fields
	 * @type {Array} */
	fields: ['id'],
	
	/**
	 * Sets all fields for this model. Should be overriden by the Model if it needs fine control
	 * over object creation.
	 * @param {Object} values All values to be set
	 */
	setFields: function(values) {
		_.each(this.fields, function(field) {
			if (field == 'id' && _.has(values, '_id')) {
				this['id'] = values['_id']['$oid']
			}
			else {
				this[field] = values[field]
			}
		}, this)
	},
	
	/**
	 * Finds a Model by its ID
	 * @param {String} collection
	 * @param {String} id
	 * @param {Function} callback
	 */
	findById: function(collection, id, callback) {
		this.makeRequest(collection, this.REQUEST.FIND, {id: id}, null, callback)
	},
	
	/**
	 * Finds only one Model by a variable query. If you need many, use {@link Model#findAll}
	 * @param {String} collection
	 * @param {Object} query an object with each field that should be passed as a MongoDB query
	 * @param {Function} callback
	 */
	find: function(collection, query, callback) {
		this.makeRequest(collection, this.REQUEST.FIND, {}, {q: query, fo: true}, callback)
	},
	
	/**
	 * Finds all Models that matches a query. If you need only one, use {@link Model#find}
	 * @param {String} collection
	 * @param {Object} query an object with each field that should be passed as a MongoDB query
	 * @param {Function} callback
	 */
	findAll: function(collection, query, callback) {
		this.makeRequest(collection, this.REQUEST.FIND, {}, {q: query, fo: false}, callback)
	},
	
	/**
	 * Saves the current model state in the database.
	 * @param {String} collection
	 * @param {Object} obj The upper classes should send themselves here
	 * @param {Function} callback
	 */
	save: function(collection, obj, callback) {
		var data = {}
		_.each(obj.fields, function(field) {
			data[field] = this[field]
		}, obj)
		
		this.makeRequest(collection, (data.id)? this.REQUEST.REPLACE : this.REQUEST.INSERT, data, {}, function(insertedData) {
			obj.setFields(insertedData)
			callback(obj)
		})
	},
	
	
/*
 ************************************************ INTERNAL METHODS ************************************************ 
 */
	
	mountUrl: function(collection, id, queryString) {
		//verifying parameters to make sure no one is empty
		if (!collection) throw { name: 'ArgumentError', message: 'collection not specified!' }
		id = id || null
		queryString = queryString || null
		
		if (queryString) {
            var qsParts = []
		    _.each(queryString, function(data, key) {
		    	if (typeof data == 'object' && data.length == 0) return
		        var encodedData = encodeURIComponent((key == 'q')? JSON.stringify(data) : data)
		        if (encodedData != '%7B%7D') //TODO I have no idea why _.isEmpty(data) when JSON.stringify(data) is {} returns false, so there's no way to avoid this workaround here
		        	qsParts.push(key+'='+encodedData)
		    })
		    queryString = qsParts.join('&')
		}
		
		return this._URL({ collection: collection, id: id, queryString: queryString })
	},
	
	/**
	 * Creates a generic request.
	 * @private
	 * 
	 * @param {String} collection name of the collection (table) to operate on
	 * @param {const} requestType one of Model.REQUEST constants
	 * @param {Object} data [optional] an object or an array of objects, depending on the request type.
	 * You can add here a special property "id" that would hold the object _id; this can be used
	 * to perform finds, updates, replaces and deletes, and it has higher precedence than the 
	 * queryString.query.id (aka queryString.query.id will be replaced if data.id is present)
	 * @param {Object} queryString [optional] additional query string arguments, organized in a hash
	 * @param {Function} callback [optional] called when the request is successful. Receives as argument the object returned by the request
	 * 
	 * @todo support DELETE verb using «id» URL param (currently Delete operations are done through replacing with {})
	 */
	makeRequest: function(collection, requestType, data, queryString, callback) {
		if (!_.contains(this.REQUEST, requestType))
			throw { name: 'ArgumentError', message: 'request should be one of the Model.request constants.' }
		
		var response, request = Ti.Network.createHTTPClient({
			timeout: this.timeout,
			autoEncodeUrl: false, //TODO is this really needed?
			onload: function(source) {
				response = JSON.parse(this.responseText)
				if (response == null) response = {}
				Ti.API.info("Response was ["+typeof response+']: '+JSON.stringify(response))
				if (_.contains([200, 201], this.status)) {
                    callback(response)
                }				    
		        else {
					throw { name: 'RequestError', message: '['+this.status+'] '+this.statusText+': ' }
			    	Ti.API.error(error.error) 
				}
			},
			onerror: function(error) {
				response = JSON.parse(this.responseText)
				/* There's really nothing better to do with error;
				 * I don't even know WHEN they would happen */
				throw { name: 'RequestError', message: '['+this.status+'] '+response.message }
		    	Ti.API.error(error.error)
		    }
		})
		
		var verb
		switch (requestType) {
			case this.REQUEST.INSERT:	verb = 'POST';     break
			case this.REQUEST.FIND:		verb = 'GET';      break
			case this.REQUEST.UPDATE:
			case this.REQUEST.REPLACE:
			case this.REQUEST.DELETE:   verb = 'PUT';     break
		}
		
		var useId = null
		if (_.has(data, 'id')) {
			if (!queryString) {
				useId = data.id
				data.id = undefined
			}
			else {
				queryString.q = _.extend(queryString.q || {}, { id: data.id })
			}
		}
		
		Ti.API.info('MONGO ['+verb+']: '+this.mountUrl(collection, useId, queryString))
		if (verb != 'GET') Ti.API.info('Data sent: '+JSON.stringify(data))
		
		request.open(verb, this.mountUrl(collection, useId, queryString))
		
		var headers = {
			'X-Requested-With': null, //cleaning useless default header
			'Content-Type': 'application/json;charset=utf-8'
		}
		_.each(headers, function(value, title) { request.setRequestHeader(title, value) })

		request.send(JSON.stringify(data))
	},
	
	/**
	 * Validates each of the model's fields
	 * @TODO implement this shit
	 */
	validate: function() {
		return true
	}
}