USE employeetracker_db;

INSERT INTO department (name) VALUES ("Sales");
INSERT INTO department (name) VALUES ("Engineering");
INSERT INTO department (name) VALUES ("Finance");
INSERT INTO department (name) VALUES ("Legal");
INSERT INTO department (name) VALUES ("Management");

INSERT INTO role (title, salary, department_id) VALUES ("Sales Lead", 100000, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Salesperson", 80000, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Lead Engineer", 150000, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Software Engineer", 120000, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Account Manager", 150000, 3);
INSERT INTO role (title, salary, department_id) VALUES ("Accountant", 125000, 3);
INSERT INTO role (title, salary, department_id) VALUES ("Legal Team Lead", 250000, 4);
INSERT INTO role (title, salary, department_id) VALUES ("Lawyer", 175000, 4);
INSERT INTO role (title, salary, department_id) VALUES ("District Regional Manager", 180000, 5);
INSERT INTO role (title, salary, department_id) VALUES ("Assistant to the District Regional Manager", 120000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("John", "Doe", 1, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Mike", "Chan", 2, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Ashley", "Rodriguez", 3, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Kevin", "Tupik", 4, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Malia", "Brown", 5, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Christian", "Eckenrode", 6, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Sarah", "Lourd", 7, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Tom", "Allen", 8, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Michael", "Scott", 9, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Dwight", "Schrute", 10, NULL);

UPDATE employee SET manager_id=3 WHERE id=1;
UPDATE employee SET manager_id=1 WHERE id=2;
UPDATE employee SET manager_id=9 WHERE id=3;
UPDATE employee SET manager_id=3 WHERE id=4;
UPDATE employee SET manager_id=9 WHERE id=5;
UPDATE employee SET manager_id=2 WHERE id=6;
UPDATE employee SET manager_id=9 WHERE id=7;
UPDATE employee SET manager_id=7 WHERE id=8;
UPDATE employee SET manager_id=9 WHERE id=10;