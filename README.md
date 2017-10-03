[![Travis CI](https://travis-ci.org/fizmo/ember-cli-emblem.svg?branch=master)](https://travis-ci.org/fizmo/ember-cli-emblem)
[![Dependency Status](https://david-dm.org/fizmo/ember-cli-emblem.svg?style=flat)](https://david-dm.org/fizmo/ember-cli-emblem)
[![devDependency Status](https://david-dm.org/fizmo/ember-cli-emblem/dev-status.svg?style=flat)](https://david-dm.org/fizmo/ember-cli-emblem#info=devDependencies)

# Ember-cli-emblem

This is an ember-cli addon that brings support for
[Emblem.js](http://emblemjs.com) templates.

This printer is based on version 0.9.1+ of Emblem. It compiles `.embl`,
`.emblem` and `.em` templates into Handlebars-syntax templates which
will then be compiled as standard `.hbs` templates by ember-cli.

## Ember Compatibility

This addon is currently tested with Ember 2.8 LTS, 2.12 LTS, as well
as the current release, beta, and canary profiles. Other version of 

## Installation

If you are using the `broccoli-emblem-compiler` it should be removed
before using this addon: `npm uninstall --save-dev broccoli-emblem-compiler`.

* `ember install @fizmo/ember-cli-emblem`

## Blueprints

ember-cli-emblem supports blueprint generation for routes, components, and templates. Use the `ember generate` command to add new Emblem templates.

## Options

ember-cli-emblem exposes a few instrumentation options for Emblem:

  - `blueprints: false` if true, will disable blueprint generation.  (default: false);
  - `quiet: false` if true, will quiet Emblem's deprecation notices.  (default: false)
  - `debugging: false`  if true, will output the handlebars output of Emblem to STDOUT. (default: false)

Simply add these to your `config/environment.js`:

```
ENV.emblemOptions {
  blueprints: false
}
```
