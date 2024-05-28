// Import packages/modules needed to run this application
const inquirer = require('inquirer');
const pool = require('./db.js');

function promptUser() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'directory',
            message: 'Select from the following options:',
            choices: ['View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add roles',
                'Add an employee',
                'Update an employee role'
            ]},
        ])
        .then((answers) => {
            // View tables
            switch (answers.directory) {
                case 'View all departments':
                    console.log('Viewing all departments...');
                    viewDept();
                    break;
                case 'View all roles':
                    console.log('Viewing all roles...');
                    viewRoles();
                    break;
                case 'View all employees':
                    console.log('Viewing all employees...');
                    viewEmployees();
                    break;
            // Update tables
                case 'Add a department':
                    inquirer.prompt([
                    {
                        type: 'input',
                        name: 'department_name',
                        message: 'Enter department name:'
                    }
                    ])
                    .then((answers) => {
                        console.log(`Adding new department: ${answers.department_name}`);
                        // call function to update department table + display results
                        addDepartment(answers.department_name);
                    });
                    break;
                case 'Add roles':
                    inquirer.prompt([
                    {
                        type: 'input',
                        name: 'title',
                        message: 'Enter the title of the new role:'
                    },
                    {
                        type: 'input',
                        name: 'salary',
                        message: `Enter the salary for ${newRole}`
                    },
                    {
                        type: 'list',
                        name: 'department_id',
                        message: 'Select the department ID for the new role',
                        choices: ['001, Egyptian Antiquties',
                        '002, Paleontology',
                        '003, Anthropology', 
                        '004, Botany', 
                        '005, Forensic Division', 
                        '006, Restorations'
                    ]},
                    ])
                    .then((answers) => {
                        console.log(`Adding new role: ${answers.title} with salary of ${answers.salary} in department: ${answers.department_id}`);
                        // call function to update roles table + display results
                        addRole(answers.title, answers.salary, answers.department_id);
                    });
                    break;
                case 'Add an employee':
                    inquirer.prompt([
                    {
                        type: 'input',
                        name: 'first_name',
                        message: 'What is the first name of the new employee?'
                    },
                    {
                        type: 'input',
                        name: 'last_name',
                        message: 'What is the last name of the new employee?'   
                    },
                    {
                        type: 'list',
                        name: 'roles_id',
                        message: 'Please select role for new employee:',
                        choices: [ 'Forensic Anthropologist', 
                        'Entomologist', 
                        'Bioarchaeologist', 
                        'Intern', 
                        'Computer Analysist', 
                        'Ethnobotanist', 
                        'Ethnographer', 
                        'Egyptologist' 
                    ]},
                    ])
                    .then((answers) => {
                    console.log(`New employee ${answers.first_name} ${answers.last_name}, ${answers.roles_id} added!`);
                    // call function to update employees table + display results
                    addEmployee(answers.first_name, answers.last_name, answers.roles_id);
                    });
                    break;
            // Update an employee's role + view table
                case 'Update an employee role':
                    inquirer.prompt([
                    {
                        type: 'input',
                        name: 'editEmployee',
                        message: 'Which employee do you want to update?'
                    },
                    {
                        type: 'list',
                        name: 'newRole',
                        message: 'Please select new role:'
                    },
                    {
                        choices: [ 'Forensic Anthropologist', 
                        'Entomologist', 
                        'Bioarchaeologist', 
                        'Intern', 
                        'Computer Analysist', 
                        'Ethnobotanist', 
                        'Ethnographer', 
                        'Egyptologist' 
                    ]},
                    ])
                    .then((answers) => {
                    console.log('OK');
                    // call function to update employees table + display results
                    updateEmployee();
                    });
                    break;
        }})
}

// View all of department table
async function viewDept () {
    let query = `SELECT * FROM department`;
    try {
        const res = await pool.query(query);
        console.log(res.rows);
    } catch (err) {
        console.error('An error occurred:', err)
    }
}
// View all roles table
async function viewRoles() {
    let query = `SELECT * FROM roles`;
    try {
        const res = await pool.query(query);
        console.log(res.rows);
    } catch (err) {
        console.error('An error occurred:', err)
    }
}

// View all employees table
async function viewEmployees() {
    let query = `SELECT * FROM employee`;
    try {
        const res = await pool.query(query);
        console.log(res.rows);
    } catch (err) {
        console.error('An error occurred:', err);
    }
}

// Update db if department is added
async function addDepartment(department_name) {
    let query = `INSERT INTO department (department_name)
                VALUES ($1)
                RETURNING id, department_name`;
    const values = [department_name];
    try {
        const res = await pool.query(query, values);
        console.log('Department added!', res.rows[0]);
    } catch (err) {
        console.error('An error occurred:', err);
    }
}

// Update db if role is added
async function addRole(title, salary, department_id) {
    let query = `INSERT INTO roles (title, salary)
                VALUES ($1)
                RETURNING id, title, salary, department_id`;
    const values = [title, salary, department_id];
    try {
        const res = await pool.query(query.values);
        console.log('New role added:', res.rows[0]);
    } catch (err) {
        console.error('An error occurred:', err);
    }
}

// Update db if employee is added
async function addEmployee(first_name, last_name, roles_id) {
    let query = `INSERT INTO employee (first_name, last_name, roles_id)
                VALUES ($1)
                RETURNING id, first_name, last_name, roles_id, manager_id`;
    const values = [first_name, last_name, roles_id];
    try {
        const res = await pool.query(query, values);
        console.log('Employee added!', res.rows[0]);
    } catch (err) {
        console.error('An error occurred:', err);
    }
}

async function updateEmployee() {
    let query = `UPDATE employees_db
                SET
                WHERE`;
    const values = [];
    try {
        const res = await pool.query(query, values);
        console.log('Employee updated!', res.rows[0]);
    } catch (err) {
        console.error('An error occurred:', err);
    }
}

// Initialize the application
promptUser();