const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

const viewAllEmployees = () => require("./lib/viewAllEmployees");
const viewEmployeeDepartment = () => require("./lib/viewEmployeeDepartment");
const viewEmployeeManager = () => require("./lib/viewEmployeeManager");
const addEmployee = () => require("./lib/addEmployee");
const removeEmployee = () => require("./lib/removeEmployee");
const updateEmployeeRole = () => require("./lib/updateEmployeeRole");
const updateEmployeeManager = () => require("./lib/updateEmployeeManager");
const viewAllRoles = () => require("./lib/viewAllRoles");


const connection = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "Adamologics#1",
    database: "employeeTracker_db"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    start();
})

function start(){
    inquirer.prompt([
        //List navigation options
        {
            type: "list",
            name: "nav",
            message: "What would you like to do?",
            choices: [
                "View All Employees",
                "View All Employees By Department",
                "View All Employees By Manager",
                "Add Employee",
                "Remove Employee",
                "Update Employee Role",
                "Update Employee Manager",
                "View All Roles",
                "Quit"
            ]
        }
    ])
    .then(function(data){
        console.log("User had chosen to: " + data.nav);
        console.log("-------------------------------------");
        switch (data.nav) {
            case "View All Employees":
              return viewAllEmployees().then(function(){start()});         
            case "View All Employees By Department":
              return viewEmployeeDepartment();
            case "View All Employees By Manager":
              return viewEmployeeManager();
            case "Add Employee":
              return addEmployee();
            case "Remove Employee":
              return removeEmployee();
            case "Update Employee Role":
              return updateEmployeeRole();
            case "Update Employee Manager":
              return updateEmployeeManager();
            case "View All Roles":
              return viewAllRoles();
            case "Quit":
              return quit();
          }
          
          
    })
    // .then(function(){
    //   start();
    // })
    .catch(function(err) {
        console.log(err);
      });
}

function quit(){
      console.log("Goodbye")
      console.log("-------------------------------------");
      connection.end();
  };


module.exports = quit();
// function viewEmployeeManager(){
//     console.log("Create this function")
//     console.log("-------------------------------------");
//     start();
// };

// function addEmployee(){
//     console.log("Create this function")
//     console.log("-------------------------------------");
//     start();
// };

// function removeEmployee(){
//     console.log("Create this function")
//     console.log("-------------------------------------");
//     start();
// };
// function updateEmployeeRole(){
//     console.log("Create this function")
//     console.log("-------------------------------------");
//     start();
// };
// function updateEmployeeManager(){
//     console.log("Create this function")
//     console.log("-------------------------------------");
//     start();
// };
// function viewAllRoles(){
//     console.log("Create this function")
//     console.log("-------------------------------------");
//     start();
// };
// 
// // From Homework 10: EmployeeSummary:
// // ============================================================
// function buildEngineer() {
//     inquirer
//       .prompt([
//         //Name
//         {
//           type: "input",
//           name: "name",
//           message: `What is your engineer's name?`,
//         },
//         //id
//         {
//           type: "input",
//           name: "id",
//           message: `What is your engineer's id`,
//         },
//         //email
//         {
//           type: "input",
//           name: "email",
//           message: "What is your engineer's email?",
//         },
//         //github
//         {
//           type: "input",
//           name: "github",
//           message: "What is your engineer's github username?",
//         },
//       ])
//       .then(function (data) {
//         const engineer = new Engineer(
//           data.name,
//           data.id,
//           data.email,
//           data.github
//         );
//         employeeArr.push(engineer);
//         buildEmployee();
//       })
//       .catch(function (err) {
//         console.log(err);
//       });
//   }