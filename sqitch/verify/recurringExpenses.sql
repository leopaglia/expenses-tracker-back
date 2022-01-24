-- Verify expenses:recurringExpenses on pg

BEGIN;

DO $$
BEGIN
  PERFORM TRUE
  FROM information_schema.columns
  WHERE table_name = 'expenses'
  AND column_name = 'recurring';

  IF FOUND THEN
    RAISE EXCEPTION 'expenses.recurring column still exists.';
  END IF;
END;
$$;

DO $$ 
BEGIN
  PERFORM TRUE
  FROM pg_enum 
  WHERE enumlabel = 'FREQ';

  IF FOUND THEN
    RAISE EXCEPTION 'FREQ type still exists.';
  END IF;
END 
$$;

SELECT 
  id, 
  name 
FROM recurring_expenses 
WHERE FALSE;

SELECT 
  id, 
  name 
FROM incomplete_expenses 
WHERE FALSE;

ROLLBACK;
