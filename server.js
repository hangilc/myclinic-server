"use strict";

var Config = require("myclinic-config");
var server = require("./index");
var program = require("commander");
var path = require("path");

function intValue(arg){
	return parseInt(arg);
}

program
	.option("-c, --config <configpath>", "Read config", process.env.MYCLINIC_CONFIG)
	.option("-p, --port <port>", "Listening port", intValue, 9000)
	.parse(process.argv)

var srcConfig = program.config;
var config = Config.read(path.join(srcConfig, "server"));
config.port = program.port;
config.subconfig = Config.read(path.join(srcConfig, "subs"));
server.run(config);

