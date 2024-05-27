// Import packages/modules needed to run this application
const inquirer = require('inquirer');

inquirer
    .prompt([
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
            ],
        },
    ])
    .then((answers) => {
        switch (answers.directory) {
            case 'View all departments':
                console.log('Viewing all departments...');
                break;
            case 'View all roles':
                console.log('Viewing all roles...');
                break;
            case 'View all employees':
                console.log('Viewing all employees...');
                break;
            case 'Add a department':
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'newDepartment',
                        message: 'Enter department name:'
                    }
                ])
                .then((answers) => {
                    console.log(`Adding new department: ${answers.newDepartment}`)
                });
                break;
            case 'Add roles':
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'newRole',
                        message: 'Enter the name of the new role:'
                    },
                    {
                        type: 'input',
                        name: 'newSalary',
                        message: `Enter the salary for ${newRole}`
                    },
                    {
                        type: 'list',
                        name: 'departmentId',
                        message: 'Select the department ID for the new role',
                        choices: ['001, Egyptian Antiquties',
                        '002, Paleontology',
                        '003, Anthropology', 
                        '004, Botany', 
                        '005, Forensic Division', 
                        '006, Restorations'
                    ],
                },
            ])
            .then((answers) => {
                console.log(`Adding new role: ${answers.newRole} with salary of ${answers.newSalary} in department: ${answers.departmentId}`);
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
                        name: 'roleId',
                        message: 'Please select role for new employee:',
                        choices: [ 'Forensic Anthropologist', 
                        'Entomologist', 
                        'Bioarchaeologist', 
                        'Intern', 
                        'Computer Analysist', 
                        'Ethnobotanist', 
                        'Ethnographer', 
                        'Egyptologist' 
                    ],
                },
            ])
            .then((answers) => {
                console.log(`New employee ${first_name} ${last_name}, ${roleId} added!`)
            });
                break;
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
                    ],
                },
            ])
        }
    })