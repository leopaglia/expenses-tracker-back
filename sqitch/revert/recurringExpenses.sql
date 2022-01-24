-- Revert expenses:recurringExpenses from pg

BEGIN;

DROP TABLE incomplete_expenses;
DROP TABLE recurring_expenses;
DROP TYPE FREQ;
ALTER TABLE expenses ADD COLUMN recurring BOOLEAN DEFAULT FALSE;

COMMIT;
