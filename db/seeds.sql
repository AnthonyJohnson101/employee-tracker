INSERT INTO department (name)
VALUES ("managment");

INSERT INTO department (name)
VALUES ("front_end");

INSERT INTO department (name)
VALUES ("back_end"); 

INSERT INTO role (title, salary, department_id)
VALUES ("lead_engineer", 100000, 1); 

INSERT INTO role (title, salary, department_id)
VALUES ("front_end_developer", 70000, 2); 

INSERT INTO role (title, salary, department_id)
VALUES ("back_end_developer", 75000, 3); 

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Brad", "Dunn", 1, null); 

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Grady", "Peck", 2, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Raman", "Aryana", 3, 1); 