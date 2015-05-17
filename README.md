# RequireJS Template Plugins [![Build Status](https://img.shields.io/travis/unindented/requirejs-template-plugins.svg)](http://travis-ci.org/unindented/requirejs-template-plugins) [![Dependency Status](https://img.shields.io/gemnasium/unindented/requirejs-template-plugins.svg)](https://gemnasium.com/unindented/requirejs-template-plugins)

Small set of plugins for [RequireJS](http://requirejs.org/) that deal with templating engines such as [Handlebars](http://handlebarsjs.com/) or [Mustache](http://mustache.github.io/).

For more plugins please check the [RequireJS wiki](https://github.com/jrburke/requirejs/wiki/Plugins).


## Installing

You can use [bower](http://bower.io/) to install this set of plugins:

```sh
$ bower install --save requirejs-template-plugins
```


## Using Underscore Templates

To use [Underscore](http://underscorejs.org/) templates in your app, your configuration should look like this:

```js
require.config({
  paths: {
    underscore: 'bower_components/requirejs-template-plugins/lib/underscore',
  },

  map: {
    '*': {
      jst:  'bower_components/requirejs-template-plugins/jst'
    }
  }
});
```

Then you would load the template in your view like this:

```js
define(function (require) {
  var Backbone = require('backbone');
  var template = require('jst!views/button');

  return Backbone.View.extend({
    template: template,

    render: function () {
      this.$el.html(template({name: 'Daniel'}));
      return this;
    }
  });
});
```

Which would try to load `views/button.jst`:

```
Hi <%=name%>!
```


## Using Handlebars Templates

To use [Handlebars](http://handlebarsjs.com/) templates, your configuration should look like this:

```js
require.config({
  paths: {
    handlebars: 'bower_components/requirejs-template-plugins/lib/handlebars',
  },

  map: {
    '*': {
      hbs: 'bower_components/requirejs-template-plugins/hbs'
    }
  }
});
```

Then you would load the template in your view like this:

```js
define(function (require) {
  var Backbone = require('backbone');
  var template = require('hbs!views/button');

  return Backbone.View.extend({
    template: template,

    render: function () {
      this.$el.html(template({name: 'Daniel'}));
      return this;
    }
  });
});
```

Which would try to load `views/button.hbs`:

```
Hi {{name}}!
```


## Using Mustache Templates

To use [Mustache](http://mustache.github.io/) templates, your configuration should look like this:

```js
require.config({
  paths: {
    hogan: 'bower_components/requirejs-template-plugins/lib/hogan',
  },

  map: {
    '*': {
      hgn: 'bower_components/requirejs-template-plugins/hgn'
    }
  }
});
```

Then you would load the template in your view like this:

```js
define(function (require) {
  var Backbone = require('backbone');
  var template = require('hgn!views/button');

  return Backbone.View.extend({
    template: template,

    render: function () {
      this.$el.html(template({name: 'Daniel'}));
      return this;
    }
  });
});
```

Which would try to load `views/button.mustache`:

```
Hi {{name}}!
```


## Testing

### Browser

Run the following:

```sh
$ grunt test:browser
```

And open <http://localhost:8000/> in your browser.

If you want to rerun tests on file changes, run the following instead:

```sh
$ grunt follow:browser
```

### PhantomJS

Run the following:

```sh
$ grunt test:phantom
```

If you want to rerun tests on file changes, run the following instead:

```sh
$ grunt follow:phantom
```


## Meta

* Code: `git clone git://github.com/unindented/requirejs-template-plugins.git`
* Home: <https://github.com/unindented/requirejs-template-plugins/>


## Contributors

Daniel Perez Alvarez ([unindented@gmail.com](mailto:unindented@gmail.com))


## License

Copyright (c) 2014 Daniel Perez Alvarez ([unindented.org](https://unindented.org/)). This is free software, and may be redistributed under the terms specified in the LICENSE file.
