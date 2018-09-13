var fs = require('fs')
var resolve = require('path').resolve
var join = require('path').join
var cp = require('child_process')
var os = require('os')

// get library path
var lib = resolve(__dirname, process.env.DIR)

fs.readdirSync(lib)
  .forEach(function (mod) {
    var modPath = join(lib, mod)
// ensure path has package.json
if (!fs.existsSync(join(modPath, 'package.json'))) return
  console.log(modPath)
// npm binary based on OS
var npmCmd = os.platform().startsWith('win') ? 'npm.cmd' : 'npm';

cp.spawn('rm', ['-rvf','node_modules'], {input:"node_modules", env: process.env, cwd: modPath, stdio: 'inherit' })
// install folder
cp.spawn(npmCmd, ['install'], { env: process.env, cwd: modPath, stdio: 'inherit' })
cp.spawn(npmCmd, ['rebuild'], { env: process.env, cwd: modPath, stdio: 'inherit' })
})