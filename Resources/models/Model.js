var config = require('config/database'),
	window = require('ui/common/components/windows'),
	_ = require('lib/underscore-1.4.2')._

/**
 * @class Models.Model
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
 * * 50X - Run to the hills! Mongolab crashed!! 
 */
module.exports = {
	/** Used internally to generate the final request URL
	 * @type {Function} 
	 * @private */
	_URL: _.template('https://api.mongolab.com/api/1/databases/marketshare/collections/<%=collection%>/<%=id%>?<%=queryString%>&apiKey='+config.API_KEY),
	
	/** Default timeout
	 * @protected */
	TIMEOUT: 5000,
	
	/** Constants for each type of Request the API should understand
	 * @private */
	REQUEST: {
		INSERT:  0,	//C
		FIND:    1,	//R
		UPDATE:  2,	//U
		REPLACE: 3,	//U
		DELETE:  4	//D
	},
	
	/** Should be overriden by the upper models to list its fields
	 * @type {Array}
	 * @protected */
	fields: ['id'],
	
	/**
	 * Sets all fields for this model. Should be overriden by the Model if it needs fine control
	 * over object creation.
	 * @param {Object} values All values to be set
	 */
	setFields: function(values) {
		_.each(this.fields, function(field) {
			if (field == 'id' && _.has(values, '_id')) {
				this.id = values._id.$oid
			}
			else {
				this[field] = values[field]
			}
		}, this)
	},
	
	/**
	 * Finds a Model by its ID
	 * @param {String} collection the collection name
	 * @param {String} id the ObjectID for the required item
	 * @param {Function} callback (optional) a function to be called when the operation is done.
	 * Receives as argument a simple Object with the item's properties
	 */
	findById: function(collection, id, callback) {
		this.makeRequest(collection, this.REQUEST.FIND, {id: id}, null, callback)
	},
	
	/**
	 * Finds only one Model by a variable query. If you need many, use {@link Models.Model#findAll}
	 * @param {String} collection the collection name
	 * @param {Object} query an object with each field that should be passed as a MongoDB query
	 * @param {Function} callback (optional) a function to be called when the operation is done.
	 * Receives as argument a simple Object with the item's properties
	 */
	find: function(collection, query, callback) {
		this.makeRequest(collection, this.REQUEST.FIND, {}, {q: query, fo: true}, callback)
	},
	
	/**
	 * Finds all Models that matches a query. If you need only one, use {@link Models.Model#find}
	 * @param {String} collection the collection name
	 * @param {Object} query an object with each field that should be passed as a MongoDB query
	 * @param {Function} callback (optional) a function to be called when the operation is done.
	 * Receives as argument the array of simple Objects
	 */
	findAll: function(collection, query, callback) {
		this.makeRequest(collection, this.REQUEST.FIND, {}, {q: query, fo: false}, callback)
	},
	
	/**
	 * Saves the current model state in the database.
	 * @param {String} collection the collection name
	 * @param {Object} obj The upper classes should send themselves here
	 * @param {Function} callback (optional) a function to be called when the operation is done.
	 * Receives as argument the own {@link Model Model object}
	 * TODO: verify if the replace is working correctly too
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
	
	/**
	 * Updates the current object in the database with new data.
	 * @param {String} collection the collection name
	 * @param {String} id the ID for the object being updated
	 * @param {Object} newData the fields to be updated, with their values
	 * @param {Function} callback (optional) a function to be called when the operation is done.
	 * Receives as argument all the object fields, after updated.
	 */
	update: function(collection, id, newData, callback) {
		var _newData = _(newData)
		
		if (_newData.has('$push') || _newData.has('$unset') || _newData.has('$set'))
			_.extend(newData, { id: id })
		else
			newData = { $set: newData, id: id }
			
		this.makeRequest(collection, this.REQUEST.UPDATE, newData, {}, callback)
	},
	
	remove: function(collection, id, callback) {
		this.makeRequest(collection, this.REQUEST.DELETE, {id: id}, {}, callback)
	},
	
	
/*
 ************************************************ INTERNAL METHODS ************************************************ 
 */

	/** Used on every request, to block UI for network updates
	 * @type {Ti.UI.ActivityIndicator}
	 * @private */
	loading: window.createActivityIndicator(),
	
	/** Used to identify if there's already an activity indicator active'
	 * @type {boolean}
	 * @private */
	withLoading: false,
	
	/**
	 * Shows an activity indicator that blocks the UI
	 * @private
	 */
	addLoading: function() {
		if (Ti.App.currentWindow && !this.withLoading) {
			if (!Ti.App.currentWindow.loading) {
				Ti.App.currentWindow.loading = this.loading
				Ti.App.currentWindow.add(Ti.App.currentWindow.loading)
			}
			Ti.App.currentWindow.loading.show()
			this.withLoading = true
		}
	},
	
	/**
	 * Removes the activity indicator blocking the UI
	 * @private
	 */
	removeLoading: function() {
		if (Ti.App.currentWindow && this.withLoading) {
			Ti.App.currentWindow.loading.hide()
			this.withLoading = false
		}
	},
	
	/**
	 * Creates the basic URL needed for a database request.
	 * @requires {@link Models.Model#_URL Requires \_URL}
	 * @private
	 * 
	 * @param {String} collection the collection name
	 * @param {String} id (optional) the id to be used when the request is related to only one object
	 * @param {Object} queryString (optional) all parameters for the queryString
	 * @return {String} the complete URL, ready for a request
	 */
	mountUrl: function(collection, id, queryString) {
		//verifying parameters to make sure no one is empty
		if (!collection) throw { name: 'ArgumentError', message: 'collection not specified!' }
		id = id || null
		queryString = queryString || null
		
		if (queryString) {
            var qsParts = []
		    _.each(queryString, function(data, key) {
		    	if (typeof data == 'object' && _.keys(data).length == 0) return
		    	else {
					var encodedData = encodeURIComponent((key == 'q')? JSON.stringify(data) : data)        
		        	qsParts.push(key+'='+encodedData)
		        }
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
	 * @param {Object} data (optional) an object or an array of objects, depending on the request type.
	 * You can add here a special property "id" that would hold the object _id; this can be used
	 * to perform finds, updates, replaces and deletes, and it has higher precedence than the 
	 * queryString.query.id (aka queryString.query.id will be replaced if data.id is present)
	 * @param {Object} queryString (optional) additional query string arguments, organized in a hash
	 * @param {Function} callback (optional) called when the request is successful.
	 * Receives as argument the object returned by the request
	 */
	makeRequest: function(collection, requestType, data, queryString, callback) {
		if (!_.contains(this.REQUEST, requestType))
			throw { name: 'ArgumentError', message: 'request should be one of the Model.request constants.' }
		
		var that = this,
			withLoading = false
		var response, request = Ti.Network.createHTTPClient({
			timeout: this.TIMEOUT,
			autoEncodeUrl: false, //TODO is this really needed?
			onload: function(source) {
				response = JSON.parse(this.responseText)
				if (response === null) response = {}
				Ti.API.info("Response was ["+typeof response+']: '+JSON.stringify(response))
				
				that.removeLoading()
				
				if (_.contains([200, 201], this.status)) {
                    if (_.isFunction(callback)) callback(response)
                }				    
		        else {
					Ti.API.error(error.error)
					throw { name: 'RequestError', message: '['+this.status+'] '+this.statusText+': ' }
				}
			},
			
			onerror: function(error) {
				that.removeLoading()
				alert(L('unavailable'))
				Ti.API.error('MONGO ANSWERED ERROR '+this.status+': '+this.statusText)
			}//,
			
		/*
		 * FIXME: Not working,  Ti.Network.HTTPClient.* are all undefined. Probably fixed in a
		 * newer SDK. Check back and remove the other calls to add/removeLoading()
			onreadystatechange: function() {
				switch (this.readyState) {
					case Ti.Network.HTTPClient.UNSENT:
					case Ti.Network.HTTPClient.OPENED:
						that.addLoading()
					break
					
					case Ti.Network.HTTPClient.DONE:
						that.removeLoading()
					break
				}
			}
	   	*/
		})
		
		var verb
		switch (requestType) {
			case this.REQUEST.INSERT:	verb = 'POST';   break
			case this.REQUEST.FIND:		verb = 'GET';    break
			case this.REQUEST.UPDATE:
			case this.REQUEST.REPLACE:	verb = 'PUT';    break
			case this.REQUEST.DELETE:	verb = 'DELETE'; break	
		}
		
		var useId = null
		if (_.has(data, 'id')) {
			if (_.isEmpty(queryString)) {
				useId = data.id
				data = _.omit(data, 'id')
			}
			else {
				queryString.q = _.extend(queryString.q || {}, { _id: data.id })
			}
		}
		dataString = (_.isEmpty(data))? '' : JSON.stringify(data)
		
		Ti.API.info('MONGO ['+verb+']: '+this.mountUrl(collection, useId, queryString))
		if (verb != 'GET') Ti.API.info('Data sent: '+dataString)
		
		request.open(verb, this.mountUrl(collection, useId, queryString))
		
		var headers = {
			'X-Requested-With': null, //cleaning useless default header
			'Content-Type': 'application/json;charset=utf-8'
		}
		_.each(headers, function(value, title) { request.setRequestHeader(title, value) })

		//a better place for this would be inside the onReadyStateChange callback method, but take a look
		//at the comment there... :(
		this.addLoading()
		
		request.send(dataString)
	},
	
	/**
	 * Validates each of the model's fields
	 * @return {Boolean} if all the fields are correct
	 * TODO: implement this shit
	 */
	validate: function() {
		return true
	}
}