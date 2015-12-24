var config = require('./config.js')

var Harvest = require('../node-harvest/'),
    harvest = new Harvest({
        subdomain: config.harvest.subdomain,
        email: config.harvest.email,
        password: config.harvest.password
    });
    var Expenses = harvest.Expenses;

    var options = {
    	id: config.expense_id,
    	file: {
    		path: 'harvest.jpeg',
    		originalname: 'my-harvest-picture.jpeg'
    	}
    }

    Expenses.attachReceipt(options, function(err, reply) {
    	if (err) throw new Error(err);

    	console.log(reply);
	});
