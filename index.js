var request = require("request");
var ping = require('ping-lite');

console.log("Services:");
request("http://status.leagueoflegends.com/shards/euw", function(error, res, body) {
	if(!error){
		var data = JSON.parse(body);
		for(var i = 0; i < data.services.length; i++) {
			console.log(data.services[i].name + ": " + data.services[i].status);
		}
		console.log("Ping:");
		setInterval(function() {
			runPing(data.hostname, data.name);
		}, 1000);
	}
});


function runPing(host, name){
	var pingLol = new ping(host);
	pingLol.send(function(ms) {
		process.stdout.write(name + ' responds in '+ms+'ms                 \r');
	});
}
