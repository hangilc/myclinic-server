"use strict";

var express = require("express");
var bodyParser = require("body-parser");
var config = require("myclinic-config").create();
var app = express();

var subs = [
	{ 
		name: "service",
		package: "myclinic-service",
		config: {
			dbConfig: config.get("database"),
			masterMap: config.get("master-map"),
			nameMap: config.get("master-name"),
			houkatsuList: config.get("rcpt-houkatsu")
		}
	},
	{
		name: "practice",
		package: "myclinic-practice",
		config: {}
	},
	{
		name: "shohousen",
		package: "myclinic-shohousen",
		config: Object.assign({}, config.get("shohousen"), {
			"print-server-port": config.get("print-server-port")
		})
	},
	{
		name: "refer",
		package: "myclinic-refer",
		config: Object.assign({}, config.get("refer"), {
			predefined: config.get("refer-predefined"),
			"print-server-port": config.get("print-server-port")
		})
	}
];

subs.forEach(function(sub){
	var name = sub.name;
	var pkgName = sub.package;
	var pkg = require(pkgName);
	var config = sub.config;
	var subApp = express();
	subApp.use(bodyParser.urlencoded({extended: false}));
	subApp.use(bodyParser.json());
	pkg.initApp(subApp, config);
	if( pkg.staticDir ){
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
