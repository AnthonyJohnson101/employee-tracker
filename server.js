const inquirer = require('inquirer');
const cTable = require('console.table')
const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '6166963018',
    database: 'employee_db'
});

connection.connect(function (err) {
    if (err) throw err;
    console.log('connected!');
});

function init() {
    startMenu();
}

function startMenu() {
    
    inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: [
                {
                    name: 'View All Departments',
                    value: 'viewDepartments'
                },
                {
                    name: 'View All Roles',
                    value: 'viewRoles'
                },
                {
                    name: 'View Employees',
                    value: 'viewEmployees'
                },
                {
                    name: 'Add Department',
                    value: 'addDepartment'
                },
                {
                    name: 'Add Role',
                    value: 'addRole'
                },
                {
                    name: 'Add Employee',
                    value: 'addEmployee'
                },
                {
                    name: 'Update Employee Role',
                    value: 'updateEmployeeRole'
                },
                {
                    name: 'Update Role Salary',
                    value: 'updateRoleSalary'
                },

            ]
        }
    ]).then(res => {
        let choice = res.choice;
        switch (choice) {
            case 'viewDepartments':
                viewDepartments(); 
                break;   

            case 'viewRoles':
                viewRoles();
                break;

            case 'viewEmployees':
                viewEmployees();
                break;

            case 'addDepartment':
                addDepartmentPrompt();
                break;

            case 'addRole':
                addRolePrompt();
                break;

            case 'addEmployee':
                addEmployeePrompt();
                break;

            case 'updateEmployeeRole':
                updateEmployeeRolePrompt();
                break;

            }
        }
    );
};



function viewDepartments(){
    const table = `SELECT * FROM department`
    connection.query(table, (err, results)=> {
        if (err) {
            console.log(err);
        }
            console.table('',results)
                startMenu();
    })
};

function viewRoles(){
    const table = `SELECT title, role.id, department.name AS department, salary FROM role JOIN department ON role.department_id = department.id`
    connection.query(table, (err, results)=> {
        if (err) {
            console.log(err);
        }
            console.table('',results)
                startMenu();
    })
};

function viewEmployees(){
    const table = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, manager.first_name AS manager FROM employee LEFT JOIN employee AS manager ON employee.manager_id = manager.id INNER JOIN role ON role.id = employee.role_id INNER JOIN department ON role.department_id = department.id ORDER BY employee.id`
    connection.query(table, (err, results)=> {
        if (err) {
            console.log(err);
        }
            console.table('',results)
            startMenu();
    })
};



function addDepartmentPrompt() {
    inquirer.prompt([
        {
            name: 'departmentName',
            message: 'What is the name of the department?'
        }
    ])
        .then(res => {
            connection.query(
                `INSERT INTO department (name) VALUES (?);`, 
                [res.departmentName], 

                (err, res) => { 
                  err
                  ? console.log(err)
                  : viewDepartments() &&
                  console.log("Department added to database.")
                }
              );
        });
};

function addRolePrompt() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'roleName',
            message: 'What is the name of this role?'
        },
        {
            type: 'input', 
            name: 'salaryAmount', 
            message: 'What is the salary of this role?'
        },
        {
            type: 'input',
            name: 'departmentId',
            message: 'What department does this belong to? (Department ID)'
        }       
    ])
        .then(res => {
            connection.query(
                `INSERT INTO role (title, salary, department_id) VALUES ( ?, ?, ?);`, 
                [res.roleName, res.salaryAmount, res.departmentId],

                (err, res) => { 
                  err
                  ? console.log(err)
                  : viewRoles();
                }
              );
        });
};


function addEmployeePrompt() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'What is this employee\'s first name?'
        },
        {
            type: 'input', 
            name: 'lastName', 
            message: 'What is this employee\'s last name?'
        },
        {
            type: 'input',
            name: 'roleId',
            message: 'What role will this employee have? (Role ID)'
        },
        {
            type: 'input',
            name: 'managerId',
            message: 'What is the ID of this employee\'s manager? (if manager, then null)'
        }       
    ])
        .then(res => {
            connection.query(
                `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES( ?, ?, ?, ?)`, 
                [res.firstName, res.lastName, res.roleId, res.managerId],

                (err, res) => { 
                  err
                  ? console.log(err)
                  : viewEmployees();
                }
              );
        });
};

function updateEmployeeRolePrompt() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'employeeId',
            message: 'What is the employee\'s ID?'
        },
        {
            type: 'input', 
            name: 'roleId', 
            message: 'What is this employee\'s new role? (Role ID)'
        }   
    ])
        .then(res => {
            connection.query(
                `UPDATE employee SET role_id = ? WHERE id = ?`,
                [res.roleId, res.employeeId],

                (err, res) => { 
                  err
                  ? console.log(err)
                  : viewEmployees();
                }
              );
        });
};

init();