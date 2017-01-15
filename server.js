"use strict";

var Config = require("myclinic-config");
var server = require("./index");
var program = require("commander");
var path = require("path");

function intValue(arg){
	return parseInt(arg);
}

program
	.option("-c, --config <configpath>", "confiugration directory", process.env.MYCLINIC_CONFIG)
	.option("-p, --port <port>", "listening port", intValue, 9000)
	.option("--db-host [database-host]", "database host")
	.parse(process.argv)

var srcConfig = program.config;
var config = Config.read(path.join(srcConfig, "server"));
config.port = program.port;
//config.subconfig = Config.read(path.join(srcConfig, "subs"));
config.subconfig = {};
["refer", "cashier", "pharma", "practice", "shohousen"].forEach(function(sub){
	config.subconfig[sub] = Config.read(path.join(srcConfig, "subs", sub));
});
if( program.dbHost ){
	config.dbConfig.host = program.dbHost;
}
server.run(config);

