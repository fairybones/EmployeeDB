DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

\c employees_db;

CREATE TABLE department (
    id SERIAL PRIMARY KEY,
    dept_name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER NOT NULL,
    FOREIGN KEY(department_id)
    REFERENCES department(id)
);

JOIN department ON department.department_id = roles.department_id;

CREATE TABLE employee (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    roles_id INTEGER NOT NULL,
    
    FOREIGN KEY (roles_id)
    REFERENCES roles(id)

    manager_id INTEGER,
    REFERENCES employee(id)
);

JOIN roles ON roles.roles_id = employee.roles_id;
JOIN manager ???