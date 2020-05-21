const connection = require("../employeeTracker");
const mysql = require("mysql");
const cTable = require("console.table");

function viewAllEmployees(){
    console.log("Create this function viewAllEmployees")
    console.log("-------------------------------------");
    connection.query(
        "SELECT * FROM employee", function(err, res) {
        if (err) throw err;
        console.table('','','All Employees:', res);
      }
      )
};

module.exports = viewAllEmployees();