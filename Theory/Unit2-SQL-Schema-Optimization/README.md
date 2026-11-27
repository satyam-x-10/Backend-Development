# Unit 2: Database Schema Design, Normalization and Query Optimization

This module covers Unit 2 database engineering concepts (Lectures L13 to L17), implementing a Third Normal Form (3NF) university enrollment schema, foreign key constraints, relational CRUD queries, and B-Tree index optimization.

- [Open Live Interactive SQL Explorer](demo.html)
- [View SQL Source on Webpage](demo.html#source)
- [Back to Theory Index](../)

---

## Normalization Breakdown

1. **First Normal Form (1NF):** Atomic columns with unique primary keys on every table.
2. **Second Normal Form (2NF):** Composite dependency removed by introducing a dedicated `enrollments` junction table between `students` and `courses`.
3. **Third Normal Form (3NF):** Department details (`dept_code`, `dept_name`) are isolated into `departments` rather than duplicated inside `students` or `courses`.

---

## Execution in PostgreSQL

```bash
psql -U postgres -d postgres -f Theory/Unit2-SQL-Schema-Optimization/schema_and_queries.sql
```
