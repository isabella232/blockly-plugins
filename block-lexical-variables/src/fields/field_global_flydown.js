// -*- mode: java; c-basic-offset: 2; -*-
// Copyright © 2013-2016 MIT, All rights reserved
// Released under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
/**
 * @license
 * @fileoverview Clickable field with flydown menu of global getter and setter
 *     blocks.
 * @author fturbak@wellesley.edu (Lyn Turbak)
 */

'use strict';

import * as Blockly from 'blockly';
import '../msg';
import {FieldFlydown} from './field_flydown';

// TODO: Maybe make a single importable goog compatibility object
const goog = {
  provide: (_) => {},
  require: (_) => {},
  inherits: Blockly.utils.object.inherits,
  dom: Blockly.utils.dom,
  userAgent: Blockly.utils.userAgent,
  asserts: {
    assertObject: (_) => {},
  },
};

goog.provide('AI.Blockly.FieldGlobalFlydown');

goog.require('AI.Blockly.FieldFlydown');

/**
 * Class for a clickable global variable declaration field.
 * @param name
 * @param displayLocation
 * @param {string} text The initial parameter name in the field.
 * @extends {Blockly.Field}
 * @constructor
 */
Blockly.FieldGlobalFlydown = function(name, displayLocation) {
  Blockly.FieldGlobalFlydown.superClass_.constructor.call(this, name, true,
      displayLocation,
      // rename all references to this global variable
      Blockly.LexicalVariable.renameGlobal);
};
goog.inherits(Blockly.FieldGlobalFlydown, FieldFlydown);

Blockly.FieldGlobalFlydown.prototype.fieldCSSClassName =
    'blocklyFieldParameter';

Blockly.FieldGlobalFlydown.prototype.flyoutCSSClassName =
    'blocklyFieldParameterFlydown';

/**
 * Block creation menu for global variables
 * Returns a list of two XML elements: a getter block for name and a setter
 * block for this parameter field.
 *  @return {!Array.<string>} List of two XML elements.
 **/
Blockly.FieldGlobalFlydown.prototype.flydownBlocksXML_ = function() {
  // global name for this parameter field.
  const name = Blockly.Msg.LANG_VARIABLES_GLOBAL_PREFIX + ' ' + this.getText();
  const getterSetterXML =
      '<xml>' +
        '<block type="lexical_variable_get">' +
          '<title name="VAR">' +
            name +
          '</title>' +
        '</block>' +
        '<block type="lexical_variable_set">' +
          '<title name="VAR">' +
            name +
          '</title>' +
        '</block>' +
      '</xml>';
  return getterSetterXML;
};

/**
 * Constructs a FieldGlobalFlydown from a JSON arg object.
 * @param {!Object} options A JSON object with options.
 * @return {Blockly.FieldGlobalFlydown} The new field instance.
 * @package
 * @nocollapse
 */
Blockly.FieldGlobalFlydown.fromJson = function(options) {
  const name = Blockly.utils.replaceMessageReferences(options['name']);
  return new Blockly.FieldGlobalFlydown(name);
};

Blockly.fieldRegistry.register('field_global_flydown',
    Blockly.FieldGlobalFlydown);
