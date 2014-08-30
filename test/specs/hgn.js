define(function (require) {
  'use strict';

  describe('hgn', function () {
    describe('requiring a template without extension', function () {
      var template = require('hgn!test/specs/hgn');

      it('loads the right template', function () {
        var content = template({name: 'Daniel'});
        expect(content).toContain('Hi Daniel!');
      });
    });

    describe('requiring a template with extension', function () {
      var template = require('hgn!test/specs/hgn.html');

      it('loads the right template', function () {
        var content = template({name: 'Daniel'});
        expect(content).toContain('Bye Daniel!');
      });
    });
  });
});
