define(function (require) {
  'use strict';

  describe('hbs', function () {
    describe('requiring a template without extension', function () {
      var template = require('hbs!test/specs/hbs');

      it('loads the right template', function () {
        var content = template({name: 'Daniel'});
        expect(content).toContain('Hi Daniel!');
      });
    });

    describe('requiring a template with extension', function () {
      var template = require('hbs!test/specs/hbs.html');

      it('loads the right template', function () {
        var content = template({name: 'Daniel'});
        expect(content).toContain('Bye Daniel!');
      });
    });
  });
});
