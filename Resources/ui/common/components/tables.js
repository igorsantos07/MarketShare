var _ = require('lib/underscore-1.4.2')._,
	color = require('ui/common/components/colors')

/**
 * @class UI.Tables
 * CommonJS module that contains all table-related widgets.
 * 
 * #Simple table
 *     var tableData = []
 *     _.each(lines, function(line) {
 * 	       tableData.push(ui.createTableViewRow({ title: line.text }))
 *     })
 *     var table = ui.createTableView({ data: tableData })
 * 
 * #Table with a section
 *     var tableData = [],
 *         section = ui.createTableViewSection()
 *     _.each(lines, function(line) {
 * 	       section.add(ui.createTableViewRow({ title: line.text }))
 *     })
 *     var table = ui.createTableView({ data: [section] })
 * 
 */

/**
 * @method createTableView
 * @param {Object} properties (optional) additional properties for the table
 * @return {Ti.UI.TableView}
 */
exports.createTableView = function(properties) {
	return Ti.UI.createTableView(_.defaults(properties || {}, {
		backgroundColor: 'transparent'
	}))
}

/**
 * @method createTableView
 * @param {Object} properties (optional) additional properties for the row
 * @return {Ti.UI.TableViewRow}
 */
exports.createTableViewRow = function(properties) {
	return Ti.UI.createTableViewRow(_.defaults(properties || {}, {
		
	}))
}

/**
 * @method createTableView
 * @param {String} titleid The i18n key for this section's title
 * @param {Object} properties (optional) additional properties for the section
 * @return {Ti.UI.TableViewSection}
 */
exports.createTableViewSection = function(titleid, properties) {
	return Ti.UI.createTableViewSection(
		_.defaults(
			_.extend(properties || {}, { headerTitle: L(titleid) }),
			{
		
			}
		)
	)
}