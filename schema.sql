DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
ID INTEGER AUTO_INCREMENT NOT NULL,
product_name VARCHAR(100) NULL,
department_name VARCHAR(100) NULL,
price DECIMAL (10, 4) NOT NULL,
stock_quantity INTEGER (10) NOT NULL,
PRIMARY KEY (ID)
);


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Goverre glass", "Home & Kitchen", 35.99, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Lava Lamp", "Home & Kitchen", 14.87, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Yoga Mat", "Sports & Fitness", 26.99, 7);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bluetooth Headphones", "Electronics", 22.97, 11);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Argan Oil Mask", "c", 12.95, 12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Koffee cup", "Home & Kitchen", 12.99, 12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Babe Lashes Serum", "Beauty & Personal Care", 29.97, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Koffee cup", "Home & Kitchen", 12.99, 12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Car Vacuum", "Automotive Parts & Accesories", 27.97, 12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Coat Rack", "Home & Kitchen", 25.99, 8);

SELECT * FROM products;
SELECT stock_quantity FROM products WHERE product_name = "Goverre glass";

UPDATE products
SET department_name = "Beauty & Personal Care"
WHERE ID = 5;

