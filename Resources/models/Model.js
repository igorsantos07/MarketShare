var config = require('config/database'),
	_ = require('lib/underscore-1.4.2')._

/**
 * To interact with a collection you should use the following URL, and call
 * it with the given verb. All non-GET requests should specify a JSON in the body.
 * You should also add a query-string argument apiKey with the user's key.
 * 
 * {{Base Data}}
 * {URL}: http://api.mongolab.com/api/1/databases/«database»/collections/«collection»/
 * {Header}: Content-Type: application/json;charset=utf-8
 * 
 * {{Plain Actions}}
 * {{ ACTION   VERB  QUERY-STRING ARGS   SAMPLE BODY                                }}
 *    Insert   POST   «none»            (accepts an object or an array of objects)
 * 
 * {{Identifiable Actions}}
 * The following methods have two ways to be used: using a simple trailing slash in
 * the end or adding the object _id. With the _id you won't use any queryString parameters.
 * 
 * {{ ACTION    VERB  QUERY-STRING ARGS   SAMPLE BODY    ________        }}
 *    Find All  GET    q,c,f,fo,s,sk,l      «empty»
 *    Replace   PUT    q					(one object or array)
 *    Update    PUT    q,m,u				{ "$set": { "x": 3 } }
 *    Delete    PUT    q					{ } «always an empty object»
 *    Delete   DELETE  «none»               URL requires «id» part
 * 
 * {{Query-string arguments}}
 * q=«string»  - restrict results by the specified JSON {query}
 * c=«bool»    - return the result {count} for this query
 * f=«string»  - specify the set of {fields} to include or exclude in each document (1 - include; 0 - exclude)
 * fo=«bool»   - return a single document from the result set (same as {findOne}() using the mongo shell
 * s=«number»  - specify the order in which to {sort} each specified field (1: ascending; -1: descending)
 * sk=«number» - specify the number of results to {skip} in the result set; useful for paging
 * l=«number»  - specify the {limit} for the number of results (default is 1000)
 * 
 * {{Status Codes}}
 * 200 - Worked
 * 201 - Created
 * 400 - Misformatted data
 * 401 - Wrong credentials
 * 403 - Denied permission
 * 404 - Wrong URL
 * 405 - Wrong verb
 */
module.exports = {
	_URL: _.template('https://api.mongolab.com/api/1/databases/marketshare/collections/<%=collection%>/<%=id%>?<%=queryString%>&apiKey='+config.API_KEY),
	TIMEOUT: 5000,
	
	REQUEST: {
		INSERT:  0,	//C
		FIND:    1,	//R
		UPDATE:  2,	//U
		REPLACE: 3,	//U
		DELETE:  4	//D
	},
	
	findById: function(collection, id, callback) {
		this.makeRequest(collection, this.REQUEST.FIND, {id: id}, callback)
	},
	
	find: function(collection, query, callback) {
		this.makeRequest(collection, this.REQUEST.FIND, {}, {q: query, fo: true}, callback)
	},
	
	mountUrl: function(collection, id, queryString) {
		//verifying parameters to make sure no one is empty
		if (!collection) throw { name: 'ArgumentError', message: 'collection not specified!' }
		id = id || null
		queryString = queryString || null
		
		if (queryString) {
		    
            var qsParts = []
		    _.each(queryString, function(data, key) {
		        var encodedData = encodeURIComponent((key == 'q')? JSON.stringify(data) : data)
		        qsParts.push(key+'='+encodedData)
		    })
		    queryString = qsParts.join('&')
		}
		
		return this._URL({ collection: collection, id: id, queryString: queryString })
	},
	
	/**
	 * Creates a generic request.
	 * @param string collection name of the collection (table) to operate on
	 * @param const requestType one of Model.REQUEST constants
	 * @param Object data [optional] an object or an array of objects, depending on the request type.
	 * 		You can add here a special property "id" that would hold the object _id; this can be used
	 * 		to perform finds, updates, replaces and deletes, and it has higher precedence than the 
	 * 		queryString.query.id (aka queryString.query.id will be replaced if data.id is present)
	 * @param Object queryString [optional] additional query string arguments, organized in a hash
	 * 
	 * @todo support DELETE verb using «id» URL param (currently Delete operations are done through replacing with {})
	 */
	makeRequest: function(collection, requestType, data, queryString, callback) {
		if (!_.contains(this.REQUEST, requestType)) 
			throw { name: 'ArgumentError', message: 'request should be one of the Model.request constants.' }
		
		var response, request = Ti.Network.createHTTPClient({
			timeout: this.timeout,
			autoEncodeUrl: false,
			onload: function(source) {
				response = JSON.parse(this.responseText)
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
				queryString.query = _.extend(queryString.query || {}, { id: data.id })
			}
		}
		
		Ti.API.info('MONGO REQUEST: '+this.mountUrl(collection, useId, queryString))
		request.open(verb, this.mountUrl(collection, useId, queryString))
		
		var headers = {
			'X-Requested-With': null, //cleaning useless default header
			'Content-Type': 'application/json;charset=utf-8'
		}
		_.each(headers, function(value, title) { request.setRequestHeader(title, value) })
		
		request.send(JSON.stringify(data))
	}
}
