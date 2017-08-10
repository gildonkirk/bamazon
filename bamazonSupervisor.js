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
	askSupervisor();
});

function askSupervisor() {
	inquirer
	.prompt([
		{
			name: 'departments',
			message: 'Choose an action',
			type: 'list',
			choices: ['View product sales by department', 'Add new department']
		},
	])
	.then(function(answer) {
		var taskChoice = answer.departments;
		if(taskChoice === 'View product sales by department') {

			// viewProductSales();
		} else if(taskChoice === 'Add new department') {

			// addDepartment();
		};
	});
};