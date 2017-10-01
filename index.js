/* jshint node: true */
'use strict';

let Filter = require('broccoli-persistent-filter');
let VersionChecker = require('ember-cli-version-checker');
let path = require('path');
let defaults = require('lodash.defaults');
let assign = require('lodash.assign');

class TemplateCompiler extends Filter {
  constructor(inputTree, _options) {
    let options = _options || {};

    if (!Object.hasOwnProperty(options, 'persist')) {
      options.persist = true;
    }

    super(inputTree, options);

    this.options = options;
    this.inputTree = inputTree;

    this.compile = this.options.emblemCompiler || require('emblem').default.compile;
    this.compilerOptions = defaults(options, {
      quiet: false,
      debugging: false
    });
  }

  baseDir() {
    return __dirname;
  }

  processString(string, relativePath) {
    let options = assign({}, this.compilerOptions, { file: relativePath });

    return this.compile(string, options);
  }
}

TemplateCompiler.prototype.extensions = ['embl', 'emblem', 'em'];
TemplateCompiler.prototype.targetExtension = 'hbs';

module.exports = {
  name: 'ember-cli-emblem',
  shouldSetupRegistryInIncluded: function() {
    let checker = new VersionChecker(this);
    let ember = checker.forEmber();
    return !ember.isAbove('0.2.0');
  },
  getConfig: function() {
    var brocfileConfig = {};
    var emblemOptions = defaults(this.project.config(process.env.EMBER_ENV).emblemOptions || {},
      brocfileConfig, {
        blueprints: true
      });

    return emblemOptions;
  },
  blueprintsPath: function() {
    if (this.getConfig().blueprints) {
      return path.join(__dirname, 'blueprints');
    }
  },
  setupPreprocessorRegistry: function(type, registry) {
    var addonContext = this;
    var compiler = {
      name: 'ember-cli-emblem',
      ext: ['embl', 'emblem', 'em'],
      toTree: function(tree) {
        return new TemplateCompiler(tree, addonContext.getConfig());
      }
    };
    registry.add('template', compiler);
  },
  included: function(app){
    this._super.included.apply(this, arguments);
    if (this.shouldSetupRegistryInIncluded()) {
      this.setupPreprocessorRegistry('parent', app.registry);
    }
  }

};
