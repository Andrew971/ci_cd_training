const path = require('path');
const glob = require('glob');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const entryArray = glob.sync('./src/**/index.js');

const srcObject = entryArray.reduce((acc, item) => {
  const name = item;
  acc[name] = item;

  return acc;
}, {});

const templateObject = {
  './template/main.yaml':'./templates/index.yaml'
}
const entryObject = Object.assign(templateObject, srcObject);

console.log('object:', entryObject)

module.exports = {
  mode: "production",
  entry: entryObject,
  output: {
    filename: '[name]'
  },
  target: 'node',
  node: {
    fs: 'empty'
  },
  plugins: [new CleanWebpackPlugin(['dist'])],
  devtool: 'source-map',
  module:{
    rules:[
      {
        test: /\.ya?ml$/,
        use: {
          loader: 'yaml-import-loader',
      
          // Note: The options below are the default options
          options: {
      
            // Allows the use of the `!import <file>` type without assigning it to a
            // key. Using this will cause the target's file content to be inserted at
            // the import location.
            importRoot: false,
      
            // Allows the use of the `!import <file>` type with assigned to a key.
            // Settings this and the `importRoot` options to false will result in a
            // regular yaml-loader.
            importNested: true,
      
            // The import keyword used for yaml/json content.
            importKeyword: 'import',
      
            // The import-raw keyword used for raw file content.
            importRawKeyword: 'import-raw',
      
            // The output type. Can be 'object', 'json', or 'yaml'
            // 'object' -> exported js object
            // 'json'   -> stringified json
            // 'yaml'   -> stringified yaml
            output: 'object',
      
            // The parser options are passed to js-yaml.
            parser: {
      
              // Custom types to be used by the parser, details below.
              types: [],
      
              // The base schema to extend, can be an array of schemas.
              schema: require('js-yaml').SAFE_SCHEMA,
      
              // Allows duplicate keys to be used. The old value of a duplicate key
              // will be overwritten by the new value (`json` option in `js-yaml`).
              allowDuplicate: true,
      
              // The function to call on warning messages. By default the parser will
              // throw on warnings.
              onWarning: undefined
            }
          }
        }
      }
    ]
  }
};