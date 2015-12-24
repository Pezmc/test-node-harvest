var config = require('./config.js')

var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var Harvest = require('../node-harvest/');
var harvest = new Harvest({
    subdomain: config.harvest_oauth.subdomain,
    identifier: config.harvest_oauth.client_id,
    secret: config.harvest_oauth.secret,
    redirect_uri: config.harvest_oauth.redirect_uri
});

console.log('Visit the following and paste the access code param from the url here', harvest.getAccessTokenURL());

rl.question("Code from the URL: ", function(answer) {
	user_input_access_code = answer.trim();
	rl.close();

	harvest.parseAccessCode(user_input_access_code, function(access_token) {
		console.log('Grabbed the access token', access_token);

		var TimeTracking = harvest.TimeTracking;

		TimeTracking.daily({}, function(err, tasks) {
		    if (err) throw new Error(err);

			console.log('Loaded tasks using oauth!');
		});

		testCreateHarvestWithAccessToken(access_token);

		testFileUploadWithAccessToken(access_token);
	})
});

function testCreateHarvestWithAccessToken(access_token) {
	var harvest_with_token = new Harvest({
	    subdomain: config.harvest_oauth.subdomain,
	    access_token: access_token
	});

	var TimeTracking = harvest.TimeTracking;

	TimeTracking.daily({}, function(err, tasks) {
	    if (err) throw new Error(err);

		console.log('Loaded tasks using passed in auth_token!');
	});
}