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
  console.log("Starting function addEmployee");
  console.log("-------------------------------------");

  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;

    const myDeps = res.map(function (deps) {
      return { 
        name: deps.name,
        value: deps.id 
      };
    });

    inquirer
      .prompt([
        //List navigation options
        {
          type: "input",
          name: "first_name",
          message: "What is the employee's first name?"
        },

        {
          type: "input",
          name: "last_name",
          message: "What is the employee's last name?"
        },
        {
          type: "list",
          name: "department",
          message: "What is the new employee's department?",
          choices: myDeps
        }
      ])
      .then(function (data) {
        console.log(data.department)

        const newEmp = data;
        console.log(newEmp.department);

        connection.query("SELECT * FROM role WHERE department_id ="+newEmp.department+"", function (err, res) {
          if (err) throw err;

          const myRole = res.map(function (roles) {
            return { 
              name: roles.title,
              value: roles.id 
            };
          });

          inquirer
            .prompt([
              //List current department options
              {
                type: "list",
                name: "roles",
                message: "Select a role:",
                choices: myRole
              }
            ])
            .then(function(data){
              console.log(data);
              console.log(newEmp);
              const newRole = data.roles;
              
              connection.query("SELECT id,CONCAT(first_name, ' ', last_name) AS manager FROM employee", function(err, res){
                if (err) throw err;

                const myMan = res.map(function(man){
                  return {
                    name: man.manager,
                    value: man.id
                  }
                })
               inquirer
                .prompt([
                  //List current department options
                  {
                    type: "list",
                    name: "manager",
                    message: "Select a Manager for the employee:",
                    choices: myMan
                  }
                ]).then(function(data){
                  console.log(data);
                  console.log(newEmp);
                  // const newRole = data.roles;
                  connection.query(
                    "INSERT INTO employee SET ?",
                    {
                      first_name: newEmp.first_name,
                      last_name: newEmp.last_name,
                      role_id: newRole,
                      manager_id: data.manager

                    }
                  , function(err, res)
                    {
                    if (err) throw err;
                    viewAllEmployees();
                    }
                  )
                })
              })

              
            })

        })

      
      })
  });

}



function addRole() {
  console.log("Starting function addRole");
  console.log("-------------------------------------");
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    // console.log("results : ", res);

    // This maps the results to into a new object where id's are assigned as values that can be used to match up with the inquirer choices. This can be used to generate choices from the database instead of having an array variable that we push into then use in inquirer. 
    const myDeps = res.map(function (deps) {
      return { 
        name: deps.name,
        value: deps.id 
      };
    });

    // Should return the name field and value will be the name's id. 
    // console.table(myDeps);

    inquirer
      .prompt([
        //List navigation options
        {
          type: "input",
          name: "title",
          message: "What is the new role's title?"
        },

        {
          type: "input",
          name: "salary",
          message: "What is the new role's salary?"
        },
        {
          type: "list",
          name: "department",
          message: "What is the new role's department?",
          choices: myDeps
        }
      ])
      .then(function (data) {
        connection.query("INSERT INTO role SET ?",
          {
            title: data.title,
            salary: data.salary,
            department_id: data.department,
          },
          function (err, res) {
            if (err) throw err;
            viewAllRoles
          }
        );
      });
  });
}

function addDepartment() {
  console.log("Starting function addDepartment");
  console.log("-------------------------------------");
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    const myDeps = res.map(function (deps) {
      return { 
        name: deps.name,
        value: deps.id 
      };
    });






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
      connection.query(
        "INSERT INTO department SET ?",
        {
          name: data.department
        }
      ,
      function(err, res){
        if (err) throw err;
        viewAllDepartments();
        // start();
      }
      )
      
      
    })
 

  })
}

// READ
// ========================================================

function viewAllEmployees() {
  console.log("Starting function viewAllEmployees");
  console.log("-------------------------------------");
  connection.query("SELECT eleft.first_name, eleft.last_name, title, name as department, salary, CONCAT(eright.first_name, ' ', eright.last_name) AS manager FROM employee as eLeft LEFT JOIN role ON eleft.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee eright ON eleft.manager_id = eright.id", function (err, res) {
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
  console.log("Starting function viewEmployeeDepartment");
  console.log("-------------------------------------");
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;

    const myDeps = res.map(function (deps) {
      return { 
        name: deps.name,
        value: deps.id 
      };
    });

    inquirer
      .prompt([
        //List current department options
        {
          type: "list",
          name: "department",
          message: "Select a department to view its employees:",
          choices: myDeps
        }
      ])
      .then(function (data) {
        connection.query("SELECT eleft.first_name, eleft.last_name, title, name as department, salary, CONCAT(eright.first_name, ' ', eright.last_name) AS manager FROM employee as eLeft LEFT JOIN role ON eleft.role_id = role.id LEFT JOIN department ON role.department_id = department.id RIGHT JOIN employee eright ON eleft.manager_id = eright.id WHERE department.id="+data.department+"", function (err, res) {
          if (err) throw err;
          console.table(
            "",
            "-------------------------------------",
            "All Employees in the " + myDeps[data.department-1].name + " department:",
            "-------------------------------------",
            res
          );
          start();
        });
      })
    })
 
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
