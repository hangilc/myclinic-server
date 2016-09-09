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
	pkg.initApp(subApp, config);
	if( pkg.staticDir ){
		console.log(pkg.staticDir);
		subApp.use(express.static(pkg.staticDir));
	}
	app.use("/" + name, subApp);
});

app.get("/", function(req, res){
	res.send("hello");
})

var port = 9000;
app.listen(port, function(){
	console.log("myclinic server listening to " + port);
});