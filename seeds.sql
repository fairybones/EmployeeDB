INSERT INTO department (id, dept_name)
VALUES (001, 'Egyptian Antiquties'), 
    (002, 'Paleontology'), 
    (003, 'Anthropology'),
    (004, 'Botany'),
    (005, 'Forensic Division')
    (006, 'Restorations')

INSERT INTO role (role_id, title, salary, department_id)
VALUES (1, 'Forensic Anthropologist', 96900.30, 005),
    (2, 'Entomologist', 80808.08, 005),
    (3, 'Bioarchaeologist', 90900.09, 002),
    (4, 'Intern', 22450.60, 005),
    (5, 'Computer Analysist', 90012.06, 006)
    (6, 'Ethnobotanist', 66100.66, 004)
    (7, 'Ethnographer', 75077.75, 003)
    (8, 'Egyptologist', 90609.33, 001)

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, 'Temperance', 'Brennan', 1, '')
(2, 'Jack', 'Hodgins', 2, '1')
(3, 'Jane', 'Buikstra', 3, '')
(4, 'Zack', 'Addy', 4, '1')
(5, 'Angela', 'Montenegro', 5, '1')
(6, 'Julia', 'Kuicz', 6, '')
(7, 'James', 'McWhorter', 7, '')
(8, 'Camille', 'Saroyan', 8, '')