var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'certifiedG48*',
	database: 'bamazon'
});

connection.connect(function(err) {
	if (err) throw err;
	connection.query('SELECT * FROM products ', function(err, res) {
		if (err) throw err;
		for(i = 0; i < res.length; i++) {
			console.log('ID: ' + res[i].item_id + ' | $' + res[i].price + ' ' + res[i].product_name);
		};
		askCustomer();
	});
});

function askCustomer() {
	inquirer
		.prompt([
			{
				name: 'id',
				message: 'Which ID do you want to buy?'
			},
			{
				name: 'units',
				message: 'How many units do you want to buy?'
			}
		]);
};