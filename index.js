// Import packages/modules needed to run this application
const inquirer = require("inquirer");
const pool = require("./db.js");

// functions for queries to update db choices
async function fetchDepartments() {
  try {
    const res = await pool.query("SELECT * FROM department");
    return res.rows.map((department) => ({
      value: department.id,
      name: department.department_name,
    }));
  } catch (err) {
    console.error("Error updating departments list:", err);
    return [];
  }
}

async function fetchRoles() {
  try {
    const res = await pool.query("SELECT * FROM roles");
    return res.rows.map((roles) => ({
      value: roles.role_id,
      name: roles.title,
    }));
  } catch (err) {
    console.error("Error updating roles list:", err);
    return [];
  }
}

async function fetchEmployees() {
  try {
    const res = await pool.query("SELECT * FROM employee");
    return res.rows.map((employee) => ({
      value: employee.id,
      name: [employee.last_name, employee.first_name],
    }));
  } catch (err) {
    console.error("Error updating employees list:", err);
    return [];
  }
}

// INQUIRER
async function promptUser() {
  const options = [
    "View all departments",
    "View all roles",
    "View all employees",
    "Add a department",
    "Add roles",
    "Add an employee",
    "Update an employee role",
    "Exit application",
  ];

  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "directory",
      message: "Select from the following options:",
      choices: options,
    },
  ]);

  // View tables
  switch (answers.directory) {
    case "View all departments":
      console.log("Viewing all departments...");
      viewDept();
      break;
    case "View all roles":
      console.log("Viewing all roles...");
      viewRoles();
      break;
    case "View all employees":
      console.log("Viewing all employees...");
      viewEmployees();
      break;
    // Update tables
    case "Add a department":
      const newDepartment = await inquirer.prompt([
        {
          type: "input",
          name: "department_name",
          message: "Enter department name:",
        },
      ]);
      console.log(`Adding new department: ${newDepartment.department_name}`);
      // call function to update department table
      addDepartment(newDepartment.department_name);
      break;
    case "Add roles":
      // update departments list
      const departments = fetchDepartments();
      const newRole = await inquirer.prompt([
        {
          type: "input",
          name: "title",
          message: "Enter the title of the new role:",
        },
        {
          type: "input",
          name: "salary",
          message: `Enter the salary for this role:`,
        },
        {
          type: "list",
          name: "department_id",
          message: "Select the department ID for new role",
          choices: departments,
        },
      ]);
      console.log(
        `Adding new role: ${newRole.title} with salary of ${newRole.salary} in department: ${newRole.department_id}`
      );
      // call function to update roles table + display results
      addRole(newRole.title, newRole.salary, newRole.department_id);
      break;
    case "Add an employee":
      // update options
      const roles = fetchRoles();
      const employees = fetchEmployees();
      const newEmployee = await inquirer.prompt([
        {
          type: "input",
          name: "first_name",
          message: "What is the first name of the new employee?",
        },
        {
          type: "input",
          name: "last_name",
          message: "What is the last name of the new employee?",
        },
        {
          type: "list",
          name: "roles_id",
          message: "Please select role for new employee:",
          choices: roles,
        },
        {
          type: "list",
          name: "manager_id",
          message: "Select a manager or choose none to continue.",
          choices: [...employees, "none"],
        },
      ]);
      console.log(
        `Adding new employee: ${newEmployee.first_name} ${newEmployee.last_name}, ${newEmployee.roles_id} `
      );
      // call function to update employees table + display results
      addEmployee(
        newEmployee.first_name,
        newEmployee.last_name,
        newEmployee.roles_id,
        newEmployee.manager_id
      );
      break;
    // Update an existing employee's role
    case "Update an employee role":
      const updateEmployee = fetchEmployees();
      const allRoles = fetchRoles();
      const updates = await inquirer.prompt([
        {
          type: "list",
          name: "editEmployee",
          message: "Which employee do you want to update?",
          choices: updateEmployee,
        },
        {
          type: "list",
          name: "newRole",
          message: "Please select new role:",
          choices: allRoles,
        },
      ]);
      console.log("Employee updating...");
      updateEmployee(updates.editEmployee, updates.allRoles);
      break;
    // Option to end loop
    case "Exit application":
      console.log("Goodbye!");
      process.exit();
      break;
    default:
      console.log("Invalid option. Please try again.");
      break;
  }
}

// View all of department table
async function viewDept() {
  let query = `SELECT * FROM department`;
  try {
    const res = await pool.query(query);
    console.log(res.rows);
    promptUser();
  } catch (err) {
    console.error("An error occurred:", err);
  }
}

// View all roles table
async function viewRoles() {
  let query = `SELECT * FROM roles`;
  try {
    const res = await pool.query(query);
    console.log(res.rows);
    promptUser();
  } catch (err) {
    console.error("An error occurred:", err);
  }
}

// View all employees table
async function viewEmployees() {
  let query = `SELECT * FROM employee`;
  try {
    const res = await pool.query(query);
    console.log(res.rows);
    promptUser();
  } catch (err) {
    console.error("An error occurred:", err);
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
    console.log("Department added!", res.rows[0]);
    promptUser();
  } catch (err) {
    console.error("An error occurred:", err);
  }
}

// Update db if role is added
async function addRole(title, salary, department_id) {
  let query = `INSERT INTO roles (title, salary)
                VALUES ($1)
                RETURNING id, title, salary, department_id`;
  const values = [title, salary, department_id];
  try {
    const res = await pool.query(query, values);
    console.log("New role added:", res.rows[0]);
    promptUser();
  } catch (err) {
    console.error("An error occurred:", err);
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
    console.log("Employee added!", res.rows[0]);
    promptUser();
  } catch (err) {
    console.error("An error occurred:", err);
  }
}

async function updateEmployee() {
  let query = `UPDATE employees_db
                SET 
                WHERE`;
  const values = [];
  try {
    const res = await pool.query(query, values);
    console.log("Employee updated!", res.rows[0]);
    promptUser();
  } catch (err) {
    console.error("An error occurred:", err);
  }
}

// Initialize the application
promptUser();
