var app = require('./express');
var express = app.express;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

require("./test/app");

var port = process.env.port || 3000;
console.log("Binding to port " + port);
app.listen(port);