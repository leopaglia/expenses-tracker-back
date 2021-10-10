-- Revert expenses:initialSchema from pg

BEGIN;

DROP TABLE expense_items;
DROP TABLE expenses;
DROP TABLE categories;

COMMIT;
