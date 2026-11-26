-- Assignment 2: PostgreSQL as SQL + NoSQL: Working with JSONB
-- Student: Satyam Koranga (SAP: 590017202)

-- Task 1: Create table with fixed typed columns + JSONB
DROP TABLE IF EXISTS products CASCADE;

CREATE TABLE products (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    attributes JSONB
);

-- Task 2: Insert 5 products across 3 categories with heterogeneous JSONB attributes
INSERT INTO products (name, category, price, attributes) VALUES
('Clean Code', 'book', 499.00,
 '{"author": "Robert C. Martin", "pages": 464, "publisher": "Prentice Hall", "hardcover": false}'),

('Designing Data-Intensive Applications', 'book', 899.00,
 '{"author": "Martin Kleppmann", "pages": 616, "publisher": "O''Reilly", "hardcover": true}'),

('MacBook Pro 16', 'laptop', 2499.00,
 '{"cpu": "Apple M3 Max", "ram_gb": 36, "storage_tb": 1, "battery_hours": 22}'),

('ThinkPad X1 Carbon', 'laptop', 1749.00,
 '{"cpu": "Intel Core Ultra 7", "ram_gb": 16, "storage_tb": 1, "battery_hours": 15}'),

('Logitech MX Master 3S', 'accessory', 99.99,
 '{"color": "Graphite", "wireless": true, "dpi": 8000, "connectivity": "Bluetooth"}');

-- Verify insertion
SELECT * FROM products;

-- Task 3: Category-specific attribute filtering
-- Books: pages > 500
SELECT name, price, attributes ->> 'author' AS author, (attributes ->> 'pages')::INT AS pages
FROM products
WHERE category = 'book' AND (attributes ->> 'pages')::INT > 500;

-- Laptops: ram_gb >= 32
SELECT name, price, attributes ->> 'cpu' AS processor, (attributes ->> 'ram_gb')::INT AS ram
FROM products
WHERE category = 'laptop' AND (attributes ->> 'ram_gb')::INT >= 32;

-- Accessories: dpi >= 4000
SELECT name, price, attributes ->> 'color' AS color, (attributes ->> 'dpi')::INT AS dpi
FROM products
WHERE category = 'accessory' AND (attributes ->> 'dpi')::INT >= 4000;

-- Task 4: Containment query (@>)
SELECT id, name, category, price, attributes
FROM products
WHERE attributes @> '{"wireless": true}';

-- Task 5: Dynamic JSONB update without altering table schema
UPDATE products
SET attributes = attributes || '{"discount_pct": 15, "in_stock": true}'::JSONB
WHERE name = 'Logitech MX Master 3S';

SELECT name, attributes FROM products WHERE name = 'Logitech MX Master 3S';

-- Task 6: GIN Index and Execution Plan comparison
EXPLAIN ANALYZE
SELECT name FROM products WHERE attributes @> '{"wireless": true}';

CREATE INDEX idx_products_attributes ON products USING GIN (attributes);

EXPLAIN ANALYZE
SELECT name FROM products WHERE attributes @> '{"wireless": true}';
