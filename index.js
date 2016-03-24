var path = require('path')
var childProcess = require('child_process')
var phantomjs = require('phantomjs-prebuilt')
var process = require('process') 

var binPath = phantomjs.path
var childArgs = [
  path.join(__dirname, 'make-driving-directions.js'),
]

var opts = {
    stdio:"pipe"
}
var start = process.hrtime();
 
var child = childProcess.spawn(binPath, childArgs, opts);

child.on('exit', () => {
 
    var dur = process.hrtime(start);
    console.log('Duration',dur)
})

child.stdout.on("data", (data) =>{

       console.log(msg);
   
});