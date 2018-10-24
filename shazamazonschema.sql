create database bamazon_DB;

use bamazon_DB;

create table products (
item_id Int not null auto_increment,
product_nme varchar(100) not null,
department_name varchar(45) not null,
price int default 0,
stock_quantity Int default 0,
primary key (item_id) );

insert into products(product_name, department_name, price,
stock_quantity)
values ('lamp', 'furniture', 60, 20),
	   ('bed', 'furniture', 400, 15),
       ('chair', 'furniture', 50, 10),
       ('tv' , 'elecronics', 400, 20),
       ('playstation', 'electronics', 400, 20),
       ('xbox', 'electronics', 400, 30),
       ('nintendo', 'electronics', 300, 20),
       ('dictionary', 'book', 20, 100),
       ('history of U.S.', 'book', 25, 100),
        ('meme mysteries', 'book', 20, 15);
  select * from products;     