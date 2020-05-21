const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

// const viewAllEmployees = () => require("./lib/viewAllEmployees");
// const viewEmployeeDepartment = () => require("./lib/viewEmployeeDepartment");
// const viewEmployeeManager = () => require("./lib/viewEmployeeManager");
// const addEmployee = () => require("./lib/addEmployee");
// const removeEmployee = () => require("./lib/removeEmployee");
// const updateEmployeeRole = () => require("./lib/updateEmployeeRole");
// const updateEmployeeManager = () => require("./lib/updateEmployeeManager");
// const viewAllRoles = () => require("./lib/viewAllRoles");

const connection = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "Adamologics#1",
  database: "employeeTracker_db",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  start();
});

function start() {
  console.log("");
  inquirer
    .prompt([
      //List navigation options
      {
        type: "list",
        name: "nav",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "View All Roles",
          "View All Departments",
          "View All Employees By Department",
          // "View All Employees By Manager", BONUS
          "Add Employee",
          "Add Department",
          "Add Role",
          // "Remove Employee", BONUS
          "Update Employee Role",
          // "Update Employee Manager", BONUS
          "Quit",
        ],
      },
    ])
    .then(function (data) {
      console.log("User had chosen to: " + data.nav);
      console.log("-------------------------------------");
      switch (data.nav) {
        case "View All Employees":
          viewAllEmployees();
          break;
        case "View All Roles":
          viewAllRoles();
          break;
        case "View All Departments":
          viewAllDepartments();
          break;
        case "View All Employees By Department":
          viewEmployeeDepartment();
          break;
        // case "View All Employees By Manager":
        //   viewEmployeeManager();
        //   break;
        case "Add Employee":
          addEmployee();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "Add Role":
          addRole();
          break;
        // case "Remove Employee":
        //   removeEmployee();
        //   break;
        case "Update Employee Role":
          updateEmployeeRole();
          break;
        // case "Update Employee Manager":
        //   updateEmployeeManager();
        //   break;

        case "Quit":
          quit();
          break;
      }
    })
    // .then(function(){

    //   start();
    // })
    .catch(function (err) {
      console.log(err);
    });
}

// CRUD Functions
// ========================================================

// CREATE
// ========================================================

function addEmployee() {
  console.log("Create this function");
  console.log("-------------------------------------");
}

var departments = ["Sales", "Engineering", "Finance", "Legal", "Management"];

function addRole() {
  console.log("Starting function addRole");
  console.log("-------------------------------------");
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    console.log("results : ", res);

    const myDeps = res.map(function (deps) {
      return { name: deps.name, value: deps.id };
    });
    console.log(myDeps);

    inquirer
      .prompt([
        //List navigation options
        {
          type: "input",
          name: "title",
          message: "What is the new role's title?",
        },

        {
          type: "input",
          name: "salary",
          message: "What is the new role's salary?",
        },
        {
          type: "list",
          name: "department",
          message: "What is the new role's department?",
          choices: myDeps,
        },
      ])
      .then(function (data) {
        // console.log(
        //   "User creates role: " +
        //     data.title +
        //     " with a salary of " +
        //     data.salary +
        //     " in the " +
        //     data.department +
        //     " department."
        // );
        // switch (data.department) {
        //   case "Sales":
        //     data.department = 1;
        //     break;
        //   case "Engineering":
        //     data.department = 2;
        //     break;
        //   case "Finance":
        //     data.department = 3;
        //     break;
        //   case "Legal":
        //     data.department = 4;
        //     break;
        //   case "Management":
        //     data.department = 5;
        //     break;
        // }
        // console.log(
        //   "User creates role: " +
        //     data.title +
        //     " with a salary of " +
        //     data.salary +
        //     " in the " +
        //     data.department +
        //     " department."
        // );
        connection.query(
          "INSERT INTO role SET ?",
          {
            title: data.title,
            salary: data.salary,
            department_id: data.department,
          },
          function (err, res) {
            if (err) throw err;
            start();
          }
        );
      });
  });
}

function addDepartment() {
  console.log("Starting funciton addDepartment");
  console.log("-------------------------------------");
  inquirer
    .prompt([
      //List navigation options
      {
        type: "input",
        name: "department",
        message: "What is the new department's name?",
      },
    ])
    .then(function (data) {
      console.log("User created the " + data.department + " department");
      departments.push(data.department);
      console.table(departments);
      viewAllDepartments();
      start();
    });
}

// READ
// ========================================================

function viewAllEmployees() {
  console.log("Starting function viewAllEmployees");
  console.log("-------------------------------------");
  connection.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    console.table(
      "",
      "-------------------------------------",
      "All Employees:",
      "-------------------------------------",
      res
    );
    start();
  });
}

function viewAllRoles() {
  console.log("Starting function viewAllRoles");
  console.log("-------------------------------------");
  connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    console.table(
      "",
      "-------------------------------------",
      "All Roles:",
      "-------------------------------------",
      res
    );
    start();
  });
}

function viewAllDepartments() {
  console.log("Starting function viewAllDepartments");
  console.log("-------------------------------------");
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    console.table(
      "",
      "-------------------------------------",
      "All Departments:",
      "-------------------------------------",
      res
    );
    start();
  });
}

function viewEmployeeDepartment() {
  console.log("Create this function");
  console.log("-------------------------------------");
}

// function viewEmployeeManager(){
//   console.log("Create this function")
//   console.log("-------------------------------------");
// };

// UPDATE
// ========================================================

// function updateEmployeeManager(){
//   console.log("Create this function")
//   console.log("-------------------------------------");
// };

function updateEmployeeRole() {
  console.log("Create this function");
  console.log("-------------------------------------");
}
// DELETE
// ========================================================

// function removeEmployee(){
//   console.log("Create this function")
//   console.log("-------------------------------------");
// }

function quit() {
  console.log("Goodbye");
  console.log("-------------------------------------");
  connection.end();
}

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
