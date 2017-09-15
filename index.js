const fs = require('fs');
const exec = require('child_process').exec;

const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

var logStdout = (error, stdout, stderr) => console.log(stdout);

exec("ls -la", logStdout);

