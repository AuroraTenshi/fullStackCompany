insert into project(name, pretender, deadline) values ('Beadandó', 'ELTE', CURRENT_DATE());
insert into project(name, pretender, deadline) values ('ZH', 'BME', '2020-12-13');
insert into project(name, pretender, deadline) values ('Építkezés', 'Otthon', '2022-01-01');

insert into site(name, address, type) values ('Északi épület', 'Salgótarján', 'HR');
insert into site(name, address, type) values ('Déli iroda', 'Pécs', 'INFORMATICS');

insert into material(name, quantity, place_id) values('telefon', 3, 1);
insert into material(name, quantity, place_id) values('laptop', 10, 1);
insert into material(name, quantity, place_id) values('számítógép', 1, 2);

insert into worker(name, password, email, phone, payment, role, site_id) values('John English', '$2a$04$YDiv9c./ytEGZQopFfExoOgGlJL6/o0er0K.hiGb5TGKHUL8Ebn..', 'john@example.com','+36405050505', 120000, 'EMPLOYEE', 1);
insert into worker(name, password, email, phone, payment, role, site_id) values('Michael Jackson', '$2a$04$YDiv9c./ytEGZQopFfExoOgGlJL6/o0er0K.hiGb5TGKHUL8Ebn..', 'michael@example.com','+36211234566', 300000, 'EMPLOYER', 2);

insert into project_workers(workers_id, projects_id) values (1, 1);
insert into project_workers(workers_id, projects_id) values (1, 2);
insert into project_workers(workers_id, projects_id) values (2, 1);