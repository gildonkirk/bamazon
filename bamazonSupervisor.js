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
			viewProductSales();
		} else if(taskChoice === 'Add new department') {

			// addDepartment();
		};
	});
};

// function viewProductSales() {
// 	connection.query('SELECT * FROM departments', function(err, res) {
// 		if (err) throw err;
// 		for(i = 0; i < res.length; i++) {
// 			console.log('\nID: ' + res[i].department_id + ' | Name: ' + res[i].department_name + ' | Overhead Costs: ' + res[i].overhead_costs);
// 		};
// 	});
// };

function viewProductSales() {
	connection.query('SELECT department_id, departments.department_name, overhead_costs, SUM(products.product_sales) AS product_sales, product_sales - departments.overhead_costs AS total_profit FROM departments INNER JOIN products ON departments.department_name=products.department_name GROUP BY department_id', function(err, res) {
		if(err) throw err;
		for(i = 0; i < res.length; i++) {
			console.log('\nID: ' + res[i].department_id + ' | Name: ' + res[i].department_name + ' | Product Sales: ' + res[i].product_sales + ' | Total Profit: ' + res[i].total_profit);
		};
	});
};




