define(function (require) {
  'use strict';

  var Hogan = require('hogan');
  var util = require('./util');

  var defaults = {
    extension: 'mustache'
  };

  function loadTemplate(name, content, options, req, callback) {
    try {
      var tmpl = Hogan.compile(content, options);

      tmpl = util.bind(tmpl.render, tmpl);
      util.extend(tmpl, {template: tmpl});

      callback(null, tmpl);
    }
    catch (err) {
      callback(err);
    }
  }

  function loadTemplateBuild(name, content, options, req, callback) {
    // Hogan will be required at runtime.
    req(['hogan'], function () {
      try {
        util.extend(options, {asString: true});
        callback(null, Hogan.compile(content, options));
      }
      catch (err) {
        callback(err);
      }
    });
  }

  function writeTemplateBuild(plugin, module, content) {
    // Hogan is required at runtime.
    return 'define("' + plugin + '!' + module + '", ["hogan"], function (H) {' +
      'var t = new H.Template(' + content + ', "", H);' +
      'var r = function () {' +
        'return t.render.apply(t, arguments);' +
      '};' +
      'r.template = t;' +
      'return r;' +
    '});\n';
  }

  return {
    load:  util.loadGenerator('hgn', defaults, loadTemplate, loadTemplateBuild),
    write: util.writeGenerator('hgn', writeTemplateBuild)
  };
});
