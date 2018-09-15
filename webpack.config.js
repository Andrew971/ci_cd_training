const webpack = require('webpack'); //to access built-in plugins
const path = require('path');
const glob = require('glob');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CleanAfterEmitWebpackPlugin = require('clean-after-emit-webpack-plugin');
const {Type} = require('js-yaml');
const fs = require('fs');
const nodeExternals = require('webpack-node-externals');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')


const makeObject = (array)=>array.reduce((acc, item) => {
  console.log(item.includes('/package.json'))
  const name = item.includes('/package.json') ? item.replace('/package.json',"/output.json"):item ;
  acc[name] = item;

  return acc;
}, {});

const srcIndex = glob.sync('./src/*/index.js');
const srcPack = glob.sync('./src/*/package.json');
const srcObject = Object.assign(makeObject(srcPack), makeObject(srcIndex)) ;

const templateObject = {
  './output.yml': './templates/index.yaml'
}
const entryObject = Object.assign(templateObject, srcObject);

console.log('object:', templateObject)

module.exports = {
  mode: "production",
  entry: entryObject,
  output: {
    filename: '[name]',
    path: path.resolve(__dirname, 'build'),
    library: "[name]",
    libraryTarget: "umd",
  },
  target: 'node',
  node: {
    fs: 'empty'
  },
  plugins: [
    new UglifyJsPlugin({
      parallel: true
    }),
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(['build']),
    new CleanAfterEmitWebpackPlugin({
      paths: [
        path.resolve(__dirname, "build/output.yml"),
        path.resolve(__dirname, "build/src/*/output.json"),
      ],
    })
    ],
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.json$/,
        exclude: /node_modules/,
        type: "javascript/auto",
        use: { loader: 'file-loader',
        options:{
          name : '[path]package.[ext]',
          emitFile: true
        }
        },
      },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto",
      },
      {
        test: /\.(js|jsx)$/,
        include: [path.resolve(__dirname, "src")],
        exclude: [path.resolve(__dirname, "node_modules")],
        "use": [
          {
            "loader": require.resolve('babel-loader'),
            "options": {
              "presets": ["@babel/preset-env"],
            }
          }
        ],
      }, 
      {
        test: /\.ya?ml$/,
        include: [path.resolve(__dirname, "templates")],
        exclude: [
          path.resolve(__dirname, "node_modules"),
          path.resolve(__dirname, "src")
        ],
        use: [
          { loader: 'file-loader',
          options:{
            name : '[path]main.[ext]',
            emitFile: true
          }
          },
           {
            loader: 'yaml-import-loader',
            options: {
              importRoot: true,
              importNested: true,
              importKeyword: 'imp',
              output: 'yaml', // The parser options are passed to js-yaml.
              parser: { // Custom types to be used by the parser, details below.
                types: [ctx => new Type('!async', {
                  kind: 'mapping',
                  resolve: data => {
                    return
                      data !== null &&
                      typeof data.delay === 'number' &&
                      typeof data.result === 'string';
                  },
                  construct: data => {
                    ctx.resolveAsync = true;
                    return new Promise(resolve => {
                      setTimeout(() => resolve(data.result), data.delay);
                    });
                  },
                  instanceOf: String
                })
                ],

                schema: require('js-yaml').SAFE_SCHEMA,

                allowDuplicate: true,
                onWarning: undefined
              }
            }

          },
        ]
      }

    ]
  },
  resolve: {
    // options for resolving module requests (does not apply to resolving to
    // loaders)
    // modules: [
    //   "node_modules", path.resolve(__dirname, "src")
    // ],
    // directories where to look for modules
    extensions: [".js", ".json", ".jsx", ".yaml", "yml"]
  },
  externals:  [nodeExternals()] ,// exclude external modules
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        parallel: true
      })
    ]
  }
};