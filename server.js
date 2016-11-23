"use strict";

var Config = require("myclinic-config");
var server = require("./index");
var program = require("commander");
var path = require("path");

program
	.option("-c, --config <configpath>", "Read config", process.env.MYCLINIC_CONFIG)
	.option("-p, --port <port>", "Listening port", parseInt, 9000)
	.parse(process.argv)

var srcConfig = program.config;
var config = Config.read(path.join(srcConfig, "server"));
config.port = program.port;
config.subconfig = Config.readGlob(paht.join(srcConfig, "subs"));
server.run(config);

