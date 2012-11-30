var _ = require('lib/underscore-1.4.2')._

/**
 * @class UI
 * This class holds all the common UI components for easy usage.
 * 
 * # Example usage
 *     var ui = require('ui/common/components/all')
 *     win.add(ui.createLabel({
 *         color: ui.color.text,
 *         text: 'Testing UI component'
 *     }))
 *
 * # Child classes
 * All the methods are directly injected in this class, but the colors resides in a separate property.
 * To see methods documentation, refer to the subclass.
 * 
 * - {@link UI.Forms}
 * - {@link UI.Tables}
 * - {@link UI.Windows}
 * - {@link UI.Colors}
 */

var parts = ['forms', 'tables', 'windows']

for (i in parts) {
	var components = require('ui/common/components/'+parts[i])
	_.extend(exports, components)
}

/** @property color
 *  @type {UI.Colors}
 */
exports.color = require('ui/common/components/colors')