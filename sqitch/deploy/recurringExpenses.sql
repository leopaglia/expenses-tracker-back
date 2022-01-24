-- Deploy expenses:recurringExpenses to pg

BEGIN;

ALTER TABLE expenses DROP COLUMN recurring;

CREATE TYPE FREQ AS ENUM ('yearly', 'monthly', 'weekly');

CREATE TABLE recurring_expenses (
  id SERIAL PRIMARY KEY,
  category_id INT NOT NULL,
  frequency FREQ NOT NULL,
  name VARCHAR(255) NOT NULL,
  currency VARCHAR(3) NOT NULL,
  total DECIMAL,
  FOREIGN KEY (category_id) REFERENCES categories (id)
);

CREATE TABLE incomplete_expenses (
  id SERIAL PRIMARY KEY,
  category_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  currency VARCHAR(3) NOT NULL,
  FOREIGN KEY (category_id) REFERENCES categories (id)
);

COMMIT;
