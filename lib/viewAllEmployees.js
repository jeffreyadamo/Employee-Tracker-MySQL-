// const connection = require("../employeeTracker");
const mysql = require("mysql");
const cTable = require("console.table");
const employeeTracker = require("../employeeTracker");
// const {start} = require("../employeeTracker");

// async function viewAllEmployees(){
//     console.log("Create this function viewAllEmployees")
//     console.log("-------------------------------------");
//     try{
//         await withTransaction(connection, async() =>{
//             const allEmployees = await connection.query("SELECT * FROM employee");
//             console.table('','','All Employees:', allEmployees);
//         })
//     } catch (err) {
//         if (err) throw err;
//     }
//     // connection.query(
//     //     "SELECT * FROM employee", function(err, res) {
//     //     if (err) throw err;
//     //     console.table('','','All Employees:', res);
//     //   }
//     //   )
//     // return;
// };
function viewAllEmployees() {
  const config = {
    host: "localhost",
    port: "3306",
    user: "root",
    password: "Adamologics#1",
    database: "employeeTracker_db",
  };

  employeeTracker.Database.execute = function (config, callback) {
    const database = new employeeTracker.Database(config);
    return callback(database)
    // .then((result) => database.close()
    // .then(() => result),
    //   (err) =>
    //     database.close().then(() => {
    //       throw err;
    //     })
    // );
  };

  employeeTracker.Database.execute(config, (database) =>
    database.query("SELECT * FROM employee")
    .then((result) => {
      console.table("", "", "All Employees:", result);
      console.log(employeeTracker.wtf)
      employeeTracker.start();
    })
  ).catch((err) => {
    if (err) throw err;
  });

}

// function viewAllEmployees(){
//     database.query("SELECT * FROM employee")
//       .then (rows => {
//         console.table('','','All Employees:', rows);
//     }).then( rows => {
//         return database.close();
//      }, err => {
//          return database.close().then( () => {throw err;})
//      })
//      .catch(err => {
//          console.log(err)
//      });
// }

module.exports = viewAllEmployees();
