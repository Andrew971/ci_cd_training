const resolve = require('path').resolve;
const merge = require('@alexlafroscia/yaml-merge');
const fs = require('fs');
const yaml = require('js-yaml');

// const output = merge(resolve('./stackTemplates/samTemplate.yaml'), './stackTemplates/resources.yaml');
// console.log(output); // Writes out the resulting file, as a string
// fs.readFileSync('test.yml', 'utf8')
try {
  var doc = yaml.safeLoad(fs.readFileSync('./stackTemplates/samTemplate.yaml', 'utf8'));
  console.log(doc);
} catch (e) {
  console.log(e);
}