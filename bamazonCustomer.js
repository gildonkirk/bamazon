var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'certifiedG48*',
	database: 'bamazon'
});

var products = [];
connection.connect(function(err) {
	if (err) throw err;
	connection.query('SELECT * FROM products ', function(err, res) {
		if (err) throw err;
		for(i = 0; i < res.length; i++) {
			console.log('ID: ' + res[i].item_id + ' | $' + res[i].price + ' ' + res[i].product_name);
			products.push(res[i]);
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
		])
		.then(function(answer) {
			var chosenId = parseInt(answer.id);
			var idIndex = chosenId - 1;
			var chosenUnits = parseInt(answer.units);
			if(chosenUnits < products[idIndex].stock_quantity){
				connection.query('UPDATE products SET stock_quantity=stock_quantity-' + chosenUnits + ' WHERE item_id=' + chosenId + ';')
				connection.query('UPDATE products SET product_sales=' + products[idIndex].price * chosenUnits + ' WHERE item_id=' + chosenId + ';')
				console.log('Total price: $' + products[idIndex].price * chosenUnits);
			} else {
				console.log('Not enough stock!');
			}
		});
};
