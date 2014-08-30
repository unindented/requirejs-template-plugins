define(function (require) {
  'use strict';

  var Handlebars = require('handlebars');
  var util = require('./util');

  var defaults = {
    extension: 'hbs'
  };

  function loadTemplate(name, content, options, req, callback) {
    try {
      callback(null, Handlebars.compile(content, options));
    }
    catch (err) {
      callback(err);
    }
  }

  function loadTemplateBuild(name, content, options, req, callback) {
    // Handlebars will be required at runtime.
    req(['handlebars'], function () {
      try {
        callback(null, Handlebars.precompile(content, options));
      }
      catch (err) {
        callback(err);
      }
    });
  }

  function writeTemplateBuild(plugin, module, content) {
    // Handlebars is required at runtime.
    return 'define("' + plugin + '!' + module + '", ["handlebars"], function (H) {' +
      'return H.template(' + content + ');' +
    '});\n';
  }

  return {
    load:  util.loadGenerator('hbs', defaults, loadTemplate, loadTemplateBuild),
    write: util.writeGenerator('hbs', writeTemplateBuild)
  };
});
