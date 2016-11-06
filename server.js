"use strict";

var Config = require("myclinic-config");
var server = require("./index");
var program = require("commander");
var path = require("path");

var config = {
	port: 9000,
	"database": {
		host: process.env.MYCLINIC_DB_HOST || "localhost",
		user: process.env.MYCLINIC_DB_USER,
		password: process.env.MYCLINIC_DB_PASS,
		database: "myclinic",
		dateStrings: true
	},
	"master-map": null,
	"master-name": null,
	"rcpt-houkatsu": null
};

program
	.option("-c, --config <configpath>", "Read config", process.env.MYCLINIC_CONFIG)
	.option("-p, --port <port>", "Listening port", parseInt, 9000)
	.parse(process.argv)

var srcConfig = Config.read(program.config);
var config = srcConfig["server"];
var subconfig = {};
Object.keys(srcConfig).forEach(function(key){
	if( key === "server" ){
		return;
	}
	subconfig[key] = srcConfig[key];
});
config["subconfig"] = subconfig;

server.run(config);

