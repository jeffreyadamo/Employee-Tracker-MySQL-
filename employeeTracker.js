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

const config = {
      host: "localhost",
      port: "3306",
      user: "root",
      password: "Adamologics#1",
      database: "employeeTracker_db"
  };
  
class Database {
    constructor(config) {
        this.connection = mysql.createConnection(config);
    }
    query(sql, args) {
        return new Promise((resolve, reject ) => {
            this.connection.query(sql,args, (err,result) => {
                if (err)
                    return reject(err);
                resolve(result);
            } );
        } );
    }
    close() {
        return new Promise( (resolve, reject) => {
            this.connection.end(err => {
                if (err)
                    return reject(err);
                resolve();
            } );
        } );
    }
}

// const connection = mysql.createConnection({
//     host: "localhost",
//     port: "3306",
//     user: "root",
//     password: "Adamologics#1",
//     database: "employeeTracker_db"
// });

// connection.connect(function(err) {
//     if (err) throw err;
//     console.log("connected as id " + connection.threadId + "\n");
//     start();
// })

const start = () => {
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
              viewAllEmployees();
              break;    
            case "View All Employees By Department":
              viewEmployeeDepartment();
              break;
            case "View All Employees By Manager":
              viewEmployeeManager();
              break;
            case "Add Employee":
              addEmployee();
              break;
            case "Remove Employee":
              removeEmployee();
              break;
            case "Update Employee Role":
              updateEmployeeRole();
              break;
            case "Update Employee Manager":
              updateEmployeeManager();
              break;
            case "View All Roles":
              viewAllRoles();
              break;
            case "Quit":
              quit();
              break;
          }
    })
    .then(function(){
      start();
    })
    .catch(function(err) {
        console.log(err);
      });
}

function quit(){
      console.log("Goodbye")
      console.log("-------------------------------------");
      connection.end();
  };

start();
// module.exports = connection;
const wtf = "wtf";
module.exports = {
  Database: Database,
  start: start,
  wtf: wtf
}

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