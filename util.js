define(function (require) {
  'use strict';

  var text = require('./lib/text');

  // Generators

  var _config = null;
  var _buildCache = {};

  function cacheTemplate() {
  }

  function cacheTemplateBuild(name, tmpl) {
    if (typeof tmpl === 'undefined') {
      return _buildCache[name];
    }
    _buildCache[name] = tmpl;
  }

  function loadGenerator(key, defaults, loadTemplate, loadTemplateBuild) {
    return function (name, req, callback, config) {
      _config = config;

      var isBuild = config.isBuild;

      var keyConfig = extend({}, defaults, config[key]);
      var options   = extend({}, keyConfig.options);
      var extension = '.' + keyConfig.extension;

      var file = name;
      if (extension != null && !hasExtension(file)) {
        file += extension;
      }

      text.load(file, req, function (content) {
        var loadFunc  = (!isBuild ? loadTemplate  : loadTemplateBuild);
        var cacheFunc = (!isBuild ? cacheTemplate : cacheTemplateBuild);

        loadFunc(name, content, options, req, function (err, tmpl) {
          if (err) {
            return callback.error(err);
          }

          cacheFunc(name, tmpl);
          callback(tmpl);
        });
      });
    };
  }

  function writeGenerator(key, writeTemplateBuild) {
    return function (plugin, module, output) {
      var tmpl = cacheTemplateBuild(module);
      if (!tmpl) {
        return;
      }

      output(writeTemplateBuild(plugin, module, tmpl));
    };
  }

  // Helpers

  function bind(fn, context) {
    return function () {
      return fn.apply(context, arguments);
    };
  }

  function extend(target) {
    var source, prop, args, i, l;

    args = Array.prototype.slice.call(arguments, 1);
    for (i = 0, l = args.length; i < l; i++) {
      source = args[i];
      if (source) {
        for (prop in source) {
          target[prop] = source[prop];
        }
      }
    }

    return target;
  }

  function hasExtension(file) {
    return (/\.[^.\/]+$/).test(file);
  }

  return {
    bind:           bind,
    extend:         extend,
    loadGenerator:  loadGenerator,
    writeGenerator: writeGenerator
  };
});
