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
	askManager();
});


function askManager() {
	inquirer
	.prompt([
		{
			name: 'taskList',
			message: 'Choose an action',
			type: 'list',
			choices: ['Products for sale', 'View Low Inventory', 'Add to Inventory', 'Add new Product']
		},
	])
	.then(function(answer) {
		var taskChoice = answer.taskList;
		if(taskChoice === 'Products for sale') {
			connection.query('SELECT * FROM products ', function(err, res) {
				if (err) throw err;
				for(i = 0; i < res.length; i++) {
					console.log('ID: ' + res[i].item_id + ' | $' + res[i].price + ' ' + res[i].product_name + ' | Qty: ' + res[i].stock_quantity);
				};
			});
		};
	});
};