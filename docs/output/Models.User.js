Ext.data.JsonP.Models_User({"tagname":"class","name":"Models.User","extends":"Models.Model","mixins":[],"alternateClassNames":[],"aliases":{},"singleton":false,"requires":[],"uses":[],"enum":null,"override":null,"inheritable":null,"inheritdoc":null,"meta":{},"private":null,"id":"class-Models.User","members":{"cfg":[],"property":[{"name":"COLLECTION","tagname":"property","owner":"Models.User","meta":{},"id":"property-COLLECTION"},{"name":"REQUEST","tagname":"property","owner":"Models.Model","meta":{"private":true},"id":"property-REQUEST"},{"name":"TIMEOUT","tagname":"property","owner":"Models.Model","meta":{"protected":true},"id":"property-TIMEOUT"},{"name":"_URL","tagname":"property","owner":"Models.Model","meta":{"private":true},"id":"property-_URL"},{"name":"fields","tagname":"property","owner":"Models.User","meta":{"protected":true},"id":"property-fields"}],"method":[{"name":"constructor","tagname":"method","owner":"Models.User","meta":{},"id":"method-constructor"},{"name":"find","tagname":"method","owner":"Models.User","meta":{},"id":"method-find"},{"name":"findAll","tagname":"method","owner":"Models.User","meta":{},"id":"method-findAll"},{"name":"findById","tagname":"method","owner":"Models.User","meta":{},"id":"method-findById"},{"name":"makeRequest","tagname":"method","owner":"Models.Model","meta":{"private":true},"id":"method-makeRequest"},{"name":"mountUrl","tagname":"method","owner":"Models.Model","meta":{"private":true},"id":"method-mountUrl"},{"name":"save","tagname":"method","owner":"Models.User","meta":{},"id":"method-save"},{"name":"setFields","tagname":"method","owner":"Models.Model","meta":{},"id":"method-setFields"},{"name":"update","tagname":"method","owner":"Models.Model","meta":{},"id":"method-update"},{"name":"validate","tagname":"method","owner":"Models.Model","meta":{},"id":"method-validate"}],"event":[],"css_var":[],"css_mixin":[]},"linenr":4,"files":[{"filename":"User.js","href":"User.html#Models-User"}],"html_meta":{},"statics":{"cfg":[],"property":[],"method":[],"event":[],"css_var":[],"css_mixin":[]},"component":false,"superclasses":["Models.Model"],"subclasses":[],"mixedInto":[],"parentMixins":[],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'><a href='#!/api/Models.Model' rel='Models.Model' class='docClass'>Models.Model</a><div class='subclass '><strong>Models.User</strong></div></div><h4>Files</h4><div class='dependency'><a href='source/User.html#Models-User' target='_blank'>User.js</a></div></pre><div class='doc-contents'><p>Implementation of \"users\" collection.\nRepresentation of an app user in the database. Should have a <a href=\"#!/api/Models.Group\" rel=\"Models.Group\" class=\"docClass\">Models.Group</a>.</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-COLLECTION' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Models.User'>Models.User</span><br/><a href='source/User.html#Models-User-property-COLLECTION' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Models.User-property-COLLECTION' class='name not-expandable'>COLLECTION</a><span> : String</span></div><div class='description'><div class='short'><p>Collection name</p>\n</div><div class='long'><p>Collection name</p>\n</div></div></div><div id='property-REQUEST' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Models.Model' rel='Models.Model' class='defined-in docClass'>Models.Model</a><br/><a href='source/Model.html#Models-Model-property-REQUEST' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Models.Model-property-REQUEST' class='name expandable'>REQUEST</a><span> : Object</span><strong class='private signature' >private</strong></div><div class='description'><div class='short'>Constants for each type of Request the API should understand ...</div><div class='long'><p>Constants for each type of Request the API should understand</p>\n<p>Defaults to: <code>{INSERT: 0, FIND: 1, UPDATE: 2, REPLACE: 3, DELETE: 4}</code></p></div></div></div><div id='property-TIMEOUT' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Models.Model' rel='Models.Model' class='defined-in docClass'>Models.Model</a><br/><a href='source/Model.html#Models-Model-property-TIMEOUT' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Models.Model-property-TIMEOUT' class='name expandable'>TIMEOUT</a><span> : Number</span><strong class='protected signature' >protected</strong></div><div class='description'><div class='short'>Default timeout ...</div><div class='long'><p>Default timeout</p>\n<p>Defaults to: <code>5000</code></p></div></div></div><div id='property-_URL' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Models.Model' rel='Models.Model' class='defined-in docClass'>Models.Model</a><br/><a href='source/Model.html#Models-Model-property-_URL' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Models.Model-property-_URL' class='name not-expandable'>_URL</a><span> : Function</span><strong class='private signature' >private</strong></div><div class='description'><div class='short'><p>Used internally to generate the final request URL</p>\n</div><div class='long'><p>Used internally to generate the final request URL</p>\n</div></div></div><div id='property-fields' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Models.User'>Models.User</span><br/><a href='source/User.html#Models-User-property-fields' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Models.User-property-fields' class='name not-expandable'>fields</a><span> : Array</span><strong class='protected signature' >protected</strong></div><div class='description'><div class='short'><p>Collection fields</p>\n</div><div class='long'><p>Collection fields</p>\n<p>Overrides: <a href='#!/api/Models.Model-property-fields' rel='Models.Model-property-fields' class='docClass'>Models.Model.fields</a></p></div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-constructor' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Models.User'>Models.User</span><br/><a href='source/User.html#Models-User-method-constructor' target='_blank' class='view-source'>view source</a></div><strong class='new-keyword'>new</strong><a href='#!/api/Models.User-method-constructor' class='name expandable'>Models.User</a>( <span class='pre'>idOrProperties, [callback]</span> ) : <a href=\"#!/api/Models.User\" rel=\"Models.User\" class=\"docClass\">Models.User</a></div><div class='description'><div class='short'>Creates a User object based on an ID or an Object with the fields ...</div><div class='long'><p>Creates a User object based on an ID or an Object with the fields</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>idOrProperties</span> : String/Object<div class='sub-desc'><p>User ID or object properties. If ID, does a <a href=\"#!/api/Models.User-method-find\" rel=\"Models.User-method-find\" class=\"docClass\">find</a>;</p>\n\n<pre><code>    if property, calls <a href=\"#!/api/Models.Model-method-setFields\" rel=\"Models.Model-method-setFields\" class=\"docClass\">Models.Model.setFields</a>\n</code></pre>\n</div></li><li><span class='pre'>callback</span> : Function (optional)<div class='sub-desc'><p>to be called after <a href=\"#!/api/Models.User-method-find\" rel=\"Models.User-method-find\" class=\"docClass\">find</a> or <a href=\"#!/api/Models.Model-method-setFields\" rel=\"Models.Model-method-setFields\" class=\"docClass\">Models.Model.setFields</a></p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Models.User\" rel=\"Models.User\" class=\"docClass\">Models.User</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-find' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Models.User'>Models.User</span><br/><a href='source/User.html#Models-User-method-find' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Models.User-method-find' class='name expandable'>find</a>( <span class='pre'>collection, query, [callback]</span> )</div><div class='description'><div class='short'>Finds only one Model by a variable query. ...</div><div class='long'><p>Finds only one Model by a variable query. If you need many, use <a href=\"#!/api/Models.Model-method-findAll\" rel=\"Models.Model-method-findAll\" class=\"docClass\">Models.Model.findAll</a></p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>collection</span> : String<div class='sub-desc'><p>the collection name</p>\n</div></li><li><span class='pre'>query</span> : Object<div class='sub-desc'><p>an object with each field that should be passed as a MongoDB query</p>\n</div></li><li><span class='pre'>callback</span> : Function (optional)<div class='sub-desc'><p>a function to be called when the operation is done.\nReceives as argument a simple Object with the item's properties</p>\n</div></li></ul><p>Overrides: <a href='#!/api/Models.Model-method-find' rel='Models.Model-method-find' class='docClass'>Models.Model.find</a></p></div></div></div><div id='method-findAll' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Models.User'>Models.User</span><br/><a href='source/User.html#Models-User-method-findAll' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Models.User-method-findAll' class='name expandable'>findAll</a>( <span class='pre'>collection, query, [callback]</span> )</div><div class='description'><div class='short'>Finds all Models that matches a query. ...</div><div class='long'><p>Finds all Models that matches a query. If you need only one, use <a href=\"#!/api/Models.Model-method-find\" rel=\"Models.Model-method-find\" class=\"docClass\">Models.Model.find</a></p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>collection</span> : String<div class='sub-desc'><p>the collection name</p>\n</div></li><li><span class='pre'>query</span> : Object<div class='sub-desc'><p>an object with each field that should be passed as a MongoDB query</p>\n</div></li><li><span class='pre'>callback</span> : Function (optional)<div class='sub-desc'><p>a function to be called when the operation is done.\nReceives as argument the array of simple Objects</p>\n</div></li></ul><p>Overrides: <a href='#!/api/Models.Model-method-findAll' rel='Models.Model-method-findAll' class='docClass'>Models.Model.findAll</a></p></div></div></div><div id='method-findById' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Models.User'>Models.User</span><br/><a href='source/User.html#Models-User-method-findById' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Models.User-method-findById' class='name expandable'>findById</a>( <span class='pre'>collection, id, [callback]</span> )</div><div class='description'><div class='short'>Finds a Model by its ID ...</div><div class='long'><p>Finds a Model by its ID</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>collection</span> : String<div class='sub-desc'><p>the collection name</p>\n</div></li><li><span class='pre'>id</span> : String<div class='sub-desc'><p>the ObjectID for the required item</p>\n</div></li><li><span class='pre'>callback</span> : Function (optional)<div class='sub-desc'><p>a function to be called when the operation is done.\nReceives as argument a simple Object with the item's properties</p>\n</div></li></ul><p>Overrides: <a href='#!/api/Models.Model-method-findById' rel='Models.Model-method-findById' class='docClass'>Models.Model.findById</a></p></div></div></div><div id='method-makeRequest' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Models.Model' rel='Models.Model' class='defined-in docClass'>Models.Model</a><br/><a href='source/Model.html#Models-Model-method-makeRequest' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Models.Model-method-makeRequest' class='name expandable'>makeRequest</a>( <span class='pre'>collection, requestType, [data], [queryString], [callback]</span> )<strong class='private signature' >private</strong></div><div class='description'><div class='short'>Creates a generic request. ...</div><div class='long'><p>Creates a generic request.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>collection</span> : String<div class='sub-desc'><p>name of the collection (table) to operate on</p>\n</div></li><li><span class='pre'>requestType</span> : const<div class='sub-desc'><p>one of Model.REQUEST constants</p>\n</div></li><li><span class='pre'>data</span> : Object (optional)<div class='sub-desc'><p>an object or an array of objects, depending on the request type.\nYou can add here a special property \"id\" that would hold the object _id; this can be used\nto perform finds, updates, replaces and deletes, and it has higher precedence than the\nqueryString.query.id (aka queryString.query.id will be replaced if data.id is present)</p>\n</div></li><li><span class='pre'>queryString</span> : Object (optional)<div class='sub-desc'><p>additional query string arguments, organized in a hash</p>\n</div></li><li><span class='pre'>callback</span> : Function (optional)<div class='sub-desc'><p>called when the request is successful.\nReceives as argument the object returned by the request</p>\n\n<p>TODO: support DELETE verb using «id» URL param (currently Delete operations are done through replacing with {})</p>\n</div></li></ul></div></div></div><div id='method-mountUrl' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Models.Model' rel='Models.Model' class='defined-in docClass'>Models.Model</a><br/><a href='source/Model.html#Models-Model-method-mountUrl' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Models.Model-method-mountUrl' class='name expandable'>mountUrl</a>( <span class='pre'>collection, [id], [queryString]</span> ) : String<strong class='private signature' >private</strong></div><div class='description'><div class='short'>Creates the basic URL needed for a database request. ...</div><div class='long'><p>Creates the basic URL needed for a database request. <a href=\"#!/api/Models.Model-property-_URL\" rel=\"Models.Model-property-_URL\" class=\"docClass\">Requires _URL</a></p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>collection</span> : String<div class='sub-desc'><p>the collection name</p>\n</div></li><li><span class='pre'>id</span> : String (optional)<div class='sub-desc'><p>the id to be used when the request is related to only one object</p>\n</div></li><li><span class='pre'>queryString</span> : Object (optional)<div class='sub-desc'><p>all parameters for the queryString</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>String</span><div class='sub-desc'><p>the complete URL, ready for a request</p>\n</div></li></ul></div></div></div><div id='method-save' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Models.User'>Models.User</span><br/><a href='source/User.html#Models-User-method-save' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Models.User-method-save' class='name expandable'>save</a>( <span class='pre'>collection, obj, [callback]</span> )</div><div class='description'><div class='short'>Saves the current model state in the database. ...</div><div class='long'><p>Saves the current model state in the database.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>collection</span> : String<div class='sub-desc'><p>the collection name</p>\n</div></li><li><span class='pre'>obj</span> : Object<div class='sub-desc'><p>The upper classes should send themselves here</p>\n</div></li><li><span class='pre'>callback</span> : Function (optional)<div class='sub-desc'><p>a function to be called when the operation is done.\nReceives as argument the own Model object\nTODO: verify if the replace is working correctly too</p>\n</div></li></ul><p>Overrides: <a href='#!/api/Models.Model-method-save' rel='Models.Model-method-save' class='docClass'>Models.Model.save</a></p></div></div></div><div id='method-setFields' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Models.Model' rel='Models.Model' class='defined-in docClass'>Models.Model</a><br/><a href='source/Model.html#Models-Model-method-setFields' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Models.Model-method-setFields' class='name expandable'>setFields</a>( <span class='pre'>values</span> )</div><div class='description'><div class='short'>Sets all fields for this model. ...</div><div class='long'><p>Sets all fields for this model. Should be overriden by the Model if it needs fine control\nover object creation.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>values</span> : Object<div class='sub-desc'><p>All values to be set</p>\n</div></li></ul></div></div></div><div id='method-update' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Models.Model' rel='Models.Model' class='defined-in docClass'>Models.Model</a><br/><a href='source/Model.html#Models-Model-method-update' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Models.Model-method-update' class='name expandable'>update</a>( <span class='pre'>collection, id, newData, [callback]</span> )</div><div class='description'><div class='short'>Updates the current object in the database with new data. ...</div><div class='long'><p>Updates the current object in the database with new data.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>collection</span> : String<div class='sub-desc'><p>the collection name</p>\n</div></li><li><span class='pre'>id</span> : String<div class='sub-desc'><p>the ID for the object being updated</p>\n</div></li><li><span class='pre'>newData</span> : Object<div class='sub-desc'><p>the fields to be updated, with their values</p>\n</div></li><li><span class='pre'>callback</span> : Function (optional)<div class='sub-desc'><p>a function to be called when the operation is done.\nReceives as argument all the object fields, after updated.</p>\n</div></li></ul></div></div></div><div id='method-validate' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Models.Model' rel='Models.Model' class='defined-in docClass'>Models.Model</a><br/><a href='source/Model.html#Models-Model-method-validate' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Models.Model-method-validate' class='name expandable'>validate</a>( <span class='pre'></span> ) : Boolean</div><div class='description'><div class='short'>Validates each of the model's fields ...</div><div class='long'><p>Validates each of the model's fields</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Boolean</span><div class='sub-desc'><p>if all the fields are correct\nTODO: implement this shit</p>\n</div></li></ul></div></div></div></div></div></div></div>"});