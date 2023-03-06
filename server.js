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
            name: 'choices',
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

            case 'updateRoleSalary':
                updateRoleSalaryPrompt();
                break;
            }
        }
    );
};

function viewDepartments(){
    const table = `SELECT * FROM department`
    db.query(table, (err, results)=> {
        if (err) {
            console.log(err);
        }
            console.table('',results)
                startMenu();
    })
};

function viewRoles(){
    const table = `SELECT title, role.id, department.name AS department, salary FROM role JOIN department ON role.department_id = department.id`
    db.query(table, (err, results)=> {
        if (err) {
            console.log(err);
        }
            console.table('',results)
                startMenu();
    })
};

function viewEmployees(){
    const table = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, manager.first_name AS manager FROM employee LEFT JOIN employee AS manager ON employee.manager_id = manager.id INNER JOIN role ON role.id = employee.role_id INNER JOIN department ON role.department_id = department.id ORDER BY employee.id`
    db.query(table, (err, results)=> {
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
            name: 'name',
            message: 'What is the name of the department'
        }
    ])
        .then(res => {
        
        });
};


init();