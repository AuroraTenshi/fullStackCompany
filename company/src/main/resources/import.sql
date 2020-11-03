insert into worker(name, email, phone, payment, role) values('Tóth János', 'tothjanos@example.com','+36405050505', 120000, 'EMPLOYEE');
insert into worker(name, email, phone, payment, role) values('Rácz Mihály', 'misi@example.com','+36211234566', 300000, 'EMPLOYER');

insert into project(name, pretender, deadline) values ('Beadandó', 'ELTE', CURRENT_DATE());
insert into project(name, pretender, deadline) values ('ZH', 'BME', '2020-12-13');

insert into site(name, address, type) values ('Északi épület', 'Salgótarján', 'HR');

insert into material(name, quantity, place_id) values('telefon', 3, 1);