var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var cookieParser  = require('cookie-parser');
app.use(cookieParser());

app.use(express.static(__dirname + '/public'));

require('./assignment/model/model.server')();

var assignment = require("./assignment/app.js");
assignment(app);

var port = process.env.PORT || 3000;
console.log("Listen on port " + port);
app.listen(port);