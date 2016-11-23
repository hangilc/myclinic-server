"use strict";

var express = require("express");
var bodyParser = require("body-parser");

exports.run = function(config){
	var port = config.port;
	var app = express();

	var subs = [
		{ 
			name: "service",
			"package": "myclinic-service",
			config: config
		},
	];
	
	/**
	var subs = [
		{ 
			name: "service",
			"package": "myclinic-service",
			config: {
				dbConfig: config["database"],
				masterMap: config["master-map"],
				nameMap: config["master-name"],
				houkatsuList: config["rcpt-houkatsu"]
			}
		},
	];
	**/

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

	app.get("/config/:name", function(req, res){
		var key = req.params.name;
		res.json(config.subconfig[key]);
	});

	app.listen(port, function(){
		console.log("myclinic server listening to " + port);
	});
};

