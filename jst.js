define(function (require) {
  'use strict';

  var _ = require('underscore');
  var util = require('./util');

  var defaults = {
    extension: 'jst'
  };

  function loadTemplate(name, content, options, req, callback) {
    try {
      callback(null, _.template(content, options));
    }
    catch (err) {
      callback(err);
    }
  }

  function loadTemplateBuild(name, content, options, req, callback) {
    try {
      callback(null, _.template(content, options).source);
    }
    catch (err) {
      callback(err);
    }
  }

  function writeTemplateBuild(plugin, module, content) {
    return 'define("' + plugin + '!' + module + '", ["underscore"], function (_) {' +
      'return ' + content + ';' +
    '});\n';
  }

  return {
    load:  util.loadGenerator('jst', defaults, loadTemplate, loadTemplateBuild),
    write: util.writeGenerator('jst', writeTemplateBuild)
  };
});
