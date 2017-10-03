'use strict';

var blueprintHelpers = require('ember-cli-blueprint-test-helpers/helpers');
var setupTestHooks = blueprintHelpers.setupTestHooks;
var emberNew = blueprintHelpers.emberNew;
var emberGenerateDestroy = blueprintHelpers.emberGenerateDestroy;

var expect = require('ember-cli-blueprint-test-helpers/chai').expect;

describe('Acceptance: ember generate and destroy route', function() {
  setupTestHooks(this);

  it('route foo', function() {
    var args = ['route', 'foo'];

    // pass any additional command line options in the arguments array
    return emberNew()
      .then(() => emberGenerateDestroy(args, (file) => {
        expect(file('app/routes/foo.js')).to.contain(
                    'import Ember from \'ember\';\n\nexport default Ember.Route.extend({\n});\n');
        expect(file('app/templates/foo.emblem')).to.contain('= outlet');
    }));
  });
});
