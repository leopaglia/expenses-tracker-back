-- Deploy expenses:initialSchema to pg

BEGIN;

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE expenses (
  id SERIAL PRIMARY KEY,
  category_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  currency VARCHAR(3) NOT NULL,
  rate DECIMAL NOT NULL DEFAULT 1,
  total DECIMAL NOT NULL,
  recurring BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (category_id) REFERENCES categories (id)
);

CREATE TABLE expense_items (
  id SERIAL PRIMARY KEY,
  expense_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  total DECIMAL NOT NULL,
  FOREIGN KEY (expense_id) REFERENCES expenses (id)
);

COMMIT;
