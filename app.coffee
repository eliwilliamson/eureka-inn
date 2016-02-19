axis            = require 'axis'
rupture         = require 'rupture'
sass            = require 'node-sass'
autoprefixer    = require 'autoprefixer-stylus'
js_pipeline     = require 'js-pipeline'
css_pipeline    = require 'css-pipeline'

module.exports =
  ignores: ['readme.md', '**/light-layout.*', '**/dark-layout.*', '**/_*', '.gitignore', 'ship.*conf']

  extensions: [
    js_pipeline(
      files: 'assets/js/*.js',
      minify: true
    ),
    css_pipeline(
      files: 'assets/css/*.scss',
      minify: true
    )
  ]

  stylus:
    use: [axis(), rupture(), autoprefixer()]
    sourcemap: true

  'coffee-script':
    sourcemap: true

  jade:
    pretty: true
