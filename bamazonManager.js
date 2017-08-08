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
			choices: ['Products for sale', 'View low inventory', 'Add to inventory', 'Add new product']
		},
	])
	.then(function(answer) {
		var taskChoice = answer.taskList;
		if(taskChoice === 'Products for sale') {
			viewInventory();
		} else if(taskChoice === 'View low inventory') {
			lowInventory();
		} else if(taskChoice === 'Add to inventory') {
			addInventory();
		}
	});
};

function viewInventory() {
	connection.query('SELECT * FROM products ', function(err, res) {
		if (err) throw err;
		for(i = 0; i < res.length; i++) {
			console.log('ID: ' + res[i].item_id + ' | $' + res[i].price + ' ' + res[i].product_name + ' | Qty: ' + res[i].stock_quantity);
		};
	});
}

function lowInventory() {
	connection.query('SELECT * FROM products WHERE stock_quantity < 5', function(err, res) {
		if (err) throw err;
		for(i = 0; i < res.length; i++) {
			console.log('ID: ' + res[i].item_id + ' | $' + res[i].price + ' ' + res[i].product_name + ' | Qty: ' + res[i].stock_quantity);
		};
	});	
}

function addInventory() {
	viewInventory();
	inquirer
	.prompt([
		{
			name: 'id',
			message: 'Which ID do you want to add to?'
		},
		{
			name: 'units',
			message: 'How many units do you want to add?'
		}
	])
	.then(function(answer) {
		var chosenId = parseInt(answer.id);
		var idIndex = chosenId - 1;
		var chosenUnits = parseInt(answer.units);
		connection.query('UPDATE products SET stock_quantity=stock_quantity+' + chosenUnits + ' WHERE item_id=' + chosenId + ';')
		connection.query('SELECT stock_quantity FROM products WHERE item_id=' + chosenId + ';', function(err, res) {
			console.log(res[0].stock_quantity);
		});
	});		
};