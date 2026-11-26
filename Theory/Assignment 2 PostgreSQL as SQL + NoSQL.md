# Assignment 2 — PostgreSQL as SQL + NoSQL: Working with JSONB

**Student Name:** Satyam Koranga  
**SAP / Roll No:** 590017202  
**Course:** Backend Development (Theory)  
**Topic:** Hybrid Relational and Document Modeling using PostgreSQL `jsonb`

---

## Part A — Conceptual Questions

### 1. What is `jsonb` in PostgreSQL, and how does it differ from the plain `json` type?

PostgreSQL supports two distinct data types for storing JSON documents: `json` and `jsonb`. The primary distinction lies in their physical storage format, serialization overhead, and indexing capabilities.

The plain `json` type stores an exact textual copy of the input string, including whitespace, indentation, and duplicate key occurrences. Because PostgreSQL stores it as raw text without pre-parsing, insertion (`INSERT`/`UPDATE`) is relatively fast with minimal CPU overhead. However, every query or extraction operation must re-parse the raw text sequentially, resulting in significant execution penalties for complex nested lookups. Furthermore, `json` does not support Generalized Inverted Indexes (GIN).

Conversely, `jsonb` (JSON Binary) parses the input text upon ingestion and stores it in a decomposed, optimized binary format. Duplicate keys are automatically pruned (retaining the last value), insignificant whitespace is stripped, and key-value pairs are stored in sorted order. While write operations incur a slight processing cost due to parsing and binary conversion, read operations are exceptionally fast because key lookups bypass parsing and use direct binary offset lookups. Most critically, `jsonb` supports GIN indexing, enabling indexed containment queries and existence checks.

**SQL Example:**
```sql
-- Create table comparing both types
CREATE TABLE json_type_comparison (
    id SERIAL PRIMARY KEY,
    raw_doc JSON,
    binary_doc JSONB
);

-- Insertion demonstrates format handling
INSERT INTO json_type_comparison (raw_doc, binary_doc)
VALUES (
    '{"name": "Laptop", "specs": {"ram": 16}, "tags": ["tech", "work"]}',
    '{"name": "Laptop", "specs": {"ram": 16}, "tags": ["tech", "work"]}'
);

-- jsonb supports GIN indexing (fails on plain json)
CREATE INDEX idx_binary_doc ON json_type_comparison USING GIN (binary_doc);
```

---

### 2. How can PostgreSQL work as both a SQL and a NoSQL database in the same table?

PostgreSQL achieves hybrid multi-model architecture by allowing strictly typed, relational schema columns to coexist alongside schemaless, semi-structured `jsonb` document columns within the exact same table definition. 

In enterprise applications, standard core business entities require strict integrity guarantees: identifiers, foreign keys, currency values, audit timestamps, and invariant categories must adhere to ACID constraints, primary key rules, and referential integrity. Conversely, domain-specific attributes (such as electronic specifications, custom user preferences, variant apparel dimensions, or dynamic metadata) vary wildly between rows and frequently evolve.

By defining core relational columns (`id`, `name`, `category`, `price`) alongside an `attributes JSONB` column, developers eliminate the antipattern of creating dozens of sparse, nullable columns or complex Entity-Attribute-Value (EAV) junction tables. Developers execute standard relational operations (joins, transactions, foreign key checks) on core fields while leveraging JSON path operators on variable attributes, bridging SQL and NoSQL in one unified engine.

**SQL Example:**
```sql
-- Hybrid Table Definition
CREATE TABLE products (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    price NUMERIC(10,2) NOT NULL CHECK (price >= 0),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    attributes JSONB
);

-- Hybrid Query combining relational filtering and JSONB attribute extraction
SELECT 
    name, 
    category, 
    price, 
    attributes ->> 'brand' AS brand,
    (attributes ->> 'warranty_months')::INT AS warranty
FROM products
WHERE category = 'electronics'
  AND price <= 1000.00
  AND attributes @> '{"in_stock": true}';
```

---

### 3. Give an example of a `jsonb` query using each of these operators, with the value it returns: `->`, `->>`, `@>`, `?`, and explain the difference between the first two.

PostgreSQL provides specialized operators designed for extracting, testing, and querying `jsonb` structures:

- **`->` (Extract as JSON):** Extracts a JSON object field or array element by key name or index, preserving its native JSON formatting. The returned data type is `jsonb`.
- **`->>` (Extract as Text):** Extracts a JSON object field or array element by key name or index and converts the result directly into an unquoted SQL `text` scalar.
- **`@>` (Contains):** Evaluates whether the left `jsonb` structure wholly contains the right `jsonb` document.
- **`?` (Key Exists):** Evaluates whether a designated top-level key string exists within the target `jsonb` object.

**Core Difference Between `->` and `->>`:**  
`->` returns another `jsonb` element (e.g., `"16"` or `{"ram": 16}` as JSON), allowing chained traversals like `doc -> 'specs' ->> 'ram'`. However, it cannot be directly cast to native SQL types like `INTEGER` without syntax errors. In contrast, `->>` returns raw `text` (e.g., `16`), which can be directly cast (`::int`, `::boolean`) or used in SQL mathematical comparisons (`>`, `<`, `=`).

**SQL Examples & Return Values:**
```sql
-- Assume sample row: attributes = '{"cpu": "M3 Pro", "ram_gb": 18, "wireless": true, "ports": ["USB-C", "HDMI"]}'

-- 1. '->' returns jsonb object
SELECT attributes -> 'ports' AS ports_json
FROM products WHERE id = 1;
-- Returns: '["USB-C", "HDMI"]' (Type: jsonb)

-- 2. '->>' returns text string
SELECT attributes ->> 'cpu' AS cpu_text
FROM products WHERE id = 1;
-- Returns: 'M3 Pro' (Type: text)

-- 3. '@>' containment test (boolean)
SELECT name FROM products 
WHERE attributes @> '{"wireless": true}';
-- Returns: 'MacBook Pro' (Rows where attributes contains the exact key/value pair)

-- 4. '?' top-level key existence test (boolean)
SELECT name FROM products 
WHERE attributes ? 'ram_gb';
-- Returns: 'MacBook Pro' (Rows where 'ram_gb' key exists at root level)
```

---

### 4. How can a GIN index on a `jsonb` column change query performance?

A Generalized Inverted Index (GIN) revolutionizes `jsonb` query performance by constructing an internal B-tree index over every individual key, path, and scalar value present inside the JSON documents across all rows in a table.

In a standard table without an index, evaluating a JSON condition (e.g., `WHERE attributes @> '{"wireless": true}'`) forces the database engine to perform a **Sequential Scan** (`Seq Scan`). The engine reads every disk page of the table and parses the binary JSON document of every single row sequentially, leading to $O(N)$ execution time and severe I/O degradation on large datasets.

When a default GIN index is constructed (`USING GIN (attributes)`), the query planner utilizes an **Index Scan** or **Bitmap Index Scan**. The engine looks up the target key-value pair directly in the GIN index structure in $O(\log N)$ time, retrieves the exact tuple IDs (TIDs) of matching table pages, and reads only the matching rows.

**What GIN Speeds Up:**
- Containment queries using the `@>` operator (e.g., `WHERE attributes @> '{"color": "black"}'`).
- Key existence queries using the `?`, `?|`, and `?&` operators (e.g., `WHERE attributes ? 'battery_life'`).
- JSONPath match operators (`@@` and `@?`).

**What GIN Does NOT Help With:**
- Standard equality or inequality comparisons on extracted text scalars using `->>` (e.g., `WHERE (attributes ->> 'price')::numeric > 500`). For scalar range queries, a targeted B-tree expression index must be used instead (e.g., `CREATE INDEX ON products (((attributes ->> 'ram_gb')::int));`).
- Wildcard substring searches inside JSON string values.

**SQL Example:**
```sql
-- Create GIN index on whole attributes column
CREATE INDEX idx_products_attributes_gin ON products USING GIN (attributes);

-- Accelerated by GIN:
EXPLAIN ANALYZE 
SELECT * FROM products WHERE attributes @> '{"wireless": true}';

-- NOT accelerated by default GIN (requires B-Tree expression index):
EXPLAIN ANALYZE 
SELECT * FROM products WHERE (attributes ->> 'pages')::int > 300;
```

---

### 5. Where could PostgreSQL + `jsonb` replace a MongoDB deployment, and where would MongoDB still be the better fit?

PostgreSQL equipped with `jsonb` represents a formidable alternative to dedicated NoSQL document stores like MongoDB, but architectural trade-offs dictate the ideal selection.

#### Where PostgreSQL + `jsonb` Can Replace MongoDB:
1. **Relational Integrity with Document Flexibility:** Applications requiring relational relationships (e.g., orders, invoices, accounts) combined with dynamic attributes (custom product specs, user metadata) benefit from having a single database engine rather than maintaining a polyglot persistence architecture.
2. **ACID Transactions & Foreign Key Enforcement:** PostgreSQL provides rigorous multi-table ACID guarantees, declarative constraints, and foreign key validations across mixed relational and JSON structures, which are complex to enforce in MongoDB.
3. **Complex Analytical Joins & SQL Aggregations:** When document data must be joined against relational tables or queried with window functions, CTEs, and recursive queries, PostgreSQL’s mature SQL engine vastly outperforms MongoDB's `$lookup` aggregation pipeline.
4. **Operational Simplicity:** Eliminates the operational overhead, cost, and synchronization complexity of running two separate database clusters.

#### Where MongoDB is Still the Better Fit:
1. **Massive Horizontal Write Scaling (Sharding):** MongoDB was architected natively for distributed clusters, automatic partition rebalancing, and seamless horizontal sharding across dozens of nodes with petabyte-scale document storage. PostgreSQL horizontal scaling (via Citus or foreign data wrappers) is more complex.
2. **Rapid Schema Prototyping without DDL:** For developer teams working exclusively in JavaScript/TypeScript environments where records are nested polymorphic documents with no relational dependencies, native BSON collections align naturally with JSON/ODM tooling (Mongoose).
3. **High-Throughput Ingestion & Geodistribution:** MongoDB excels in write-intensive, distributed streaming scenarios (e.g., IoT telemetry, global session caches) where eventual consistency and multi-region replica sets are prioritized over relational constraints.

---

## Part B — Hands-on Exercise: Product Catalog

### Task 1 — Schema Definition
```sql
DROP TABLE IF EXISTS products;

CREATE TABLE products (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    attributes JSONB
);
```

### Task 2 — Insert Data (5 Products Across 3 Categories)
```sql
INSERT INTO products (name, category, price, attributes) VALUES
-- Category 1: Books
('Clean Code', 'book', 499.00,
 '{"author": "Robert C. Martin", "pages": 464, "publisher": "Prentice Hall", "hardcover": false}'),

('Designing Data-Intensive Applications', 'book', 899.00,
 '{"author": "Martin Kleppmann", "pages": 616, "publisher": "O''Reilly", "hardcover": true}'),

-- Category 2: Laptops
('MacBook Pro 16', 'laptop', 2499.00,
 '{"cpu": "Apple M3 Max", "ram_gb": 36, "storage_tb": 1, "battery_hours": 22}'),

('ThinkPad X1 Carbon', 'laptop', 1749.00,
 '{"cpu": "Intel Core Ultra 7", "ram_gb": 16, "storage_tb": 1, "battery_hours": 15}'),

-- Category 3: Accessories
('Logitech MX Master 3S', 'accessory', 99.99,
 '{"color": "Graphite", "wireless": true, "dpi": 8000, "connectivity": "Bluetooth"}');
```

### Task 3 — Query by Category-Specific Attribute

```sql
-- Query 1 (Books): Filter books with more than 500 pages
SELECT name, price, attributes ->> 'author' AS author, (attributes ->> 'pages')::INT AS pages
FROM products
WHERE category = 'book'
  AND (attributes ->> 'pages')::INT > 500;

-- Query 2 (Laptops): Filter laptops with at least 32GB RAM
SELECT name, price, attributes ->> 'cpu' AS processor, (attributes ->> 'ram_gb')::INT AS ram
FROM products
WHERE category = 'laptop'
  AND (attributes ->> 'ram_gb')::INT >= 32;

-- Query 3 (Accessories): Filter accessories with high DPI sensor (>= 4000)
SELECT name, price, attributes ->> 'color' AS color, (attributes ->> 'dpi')::INT AS dpi
FROM products
WHERE category = 'accessory'
  AND (attributes ->> 'dpi')::INT >= 4000;
```

### Task 4 — Containment Query
```sql
-- Find any product where wireless is true inside attributes
SELECT id, name, category, price, attributes
FROM products
WHERE attributes @> '{"wireless": true}';
```

### Task 5 — Update JSONB Without Altering Table Schema
```sql
-- Add discount_pct and update DPI using concatenation operator (||)
UPDATE products
SET attributes = attributes || '{"discount_pct": 15, "in_stock": true}'::JSONB
WHERE name = 'Logitech MX Master 3S';

-- Verify the dynamic update
SELECT name, attributes
FROM products
WHERE name = 'Logitech MX Master 3S';
```

### Task 6 — Indexing & Performance Comparison
```sql
-- Query before index creation
EXPLAIN ANALYZE
SELECT name FROM products WHERE attributes @> '{"wireless": true}';

-- Create GIN index on JSONB attributes column
CREATE INDEX idx_products_attributes ON products USING GIN (attributes);

-- Query execution with GIN index
EXPLAIN ANALYZE
SELECT name FROM products WHERE attributes @> '{"wireless": true}';
```

### Task 7 — MongoDB Comparison (`mongosh`)

#### MongoDB Equivalent Setup & Inserts:
```javascript
// Connect to test database
use product_catalog;

// Insert same 5 products
db.products.insertMany([
  {
    name: "Clean Code",
    category: "book",
    price: 499.00,
    attributes: { author: "Robert C. Martin", pages: 464, publisher: "Prentice Hall", hardcover: false }
  },
  {
    name: "Designing Data-Intensive Applications",
    category: "book",
    price: 899.00,
    attributes: { author: "Martin Kleppmann", pages: 616, publisher: "O'Reilly", hardcover: true }
  },
  {
    name: "MacBook Pro 16",
    category: "laptop",
    price: 2499.00,
    attributes: { cpu: "Apple M3 Max", ram_gb: 36, storage_tb: 1, battery_hours: 22 }
  },
  {
    name: "ThinkPad X1 Carbon",
    category: "laptop",
    price: 1749.00,
    attributes: { cpu: "Intel Core Ultra 7", ram_gb: 16, storage_tb: 1, battery_hours: 15 }
  },
  {
    name: "Logitech MX Master 3S",
    category: "accessory",
    price: 99.99,
    attributes: { color: "Graphite", wireless: true, dpi: 8000, connectivity: "Bluetooth" }
  }
]);

// Equivalent of Task 3 Queries in MongoDB:
// Query 1: Books with pages > 500
db.products.find(
  { category: "book", "attributes.pages": { $gt: 500 } },
  { name: 1, price: 1, "attributes.author": 1, "attributes.pages": 1 }
);

// Query 2: Laptops with RAM >= 32GB
db.products.find(
  { category: "laptop", "attributes.ram_gb": { $gte: 32 } },
  { name: 1, price: 1, "attributes.cpu": 1, "attributes.ram_gb": 1 }
);

// Query 3: Containment / wireless check
db.products.find(
  { "attributes.wireless": true },
  { name: 1, category: 1, price: 1 }
);

// Indexing in MongoDB:
db.products.createIndex({ "attributes.wireless": 1 });
db.products.createIndex({ "attributes.ram_gb": 1 });
```

#### Comparison Insights:
| Feature | PostgreSQL `jsonb` | MongoDB (`mongosh`) |
|---|---|---|
| **Query Syntax** | Specialized operators (`->`, `->>`, `@>`, `?`) with SQL type casting (`::int`) | Native JSON dot notation (`"attributes.ram_gb"`) and MQL operators (`$gte`, `$eq`) |
| **Indexing** | Single GIN index indexes **all** nested keys and values automatically | Individual compound or multikey indexes typically defined per queried field path |
| **Type Coercion** | Explicit (`->>` returns text; must cast to `int` for numerical ranges) | Native BSON numerical typing (automatic integer/double comparison) |
| **Ease of Use** | Best when data intersects with relational foreign keys and SQL analytics | Best for pure JavaScript ecosystems and nested document CRUD operations |
