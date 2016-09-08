"use strict";

var express = require("express");
var bodyParser = require("body-parser");

var app = express();

var subs = [
	{
		name: "practice",
		package: "myclinic-practice"
	}
];

subs.forEach(function(sub){
	var name = sub.name;
	var pkgName = sub.package;
	var pkg = require(pkgName);
	var config = require("./config/" + name + "-config");
	var subApp = express();
	subApp.use(bodyParser.urlencoded({extended: false}));
	subApp.use(bodyParser.json());
	subApp.use(express.static("static"));
	pkg.initApp(subApp, config);
	app.use("/" + name, subApp);
});

var port = 9000;
app.listen(port, function(){
	console.log("myclinic server listening to " + port);
});