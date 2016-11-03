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
	.option("-c, --config <configpath>", "Read config")
	.option("-p, --port <port>", "Listening port", parseInt)
	.parse(process.argv)

if( program.config ){
	Config.extend(config, Config.read(program.config));
} else {
	Config.extend(config, Config.read(path.join(process.env.MYCLINIC_CONFIG, "server")));
}
if( program.port ){
	config.port = program.port;
}

server.run(config);

