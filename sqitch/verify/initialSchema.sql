-- Verify expenses:initialSchema on pg

BEGIN;

SELECT 
  id, 
  name 
FROM categories 
WHERE FALSE;

SELECT 
  id, 
  category_id, 
  name, 
  date, 
  currency, 
  rate, 
  total, 
  recurring 
FROM expenses 
WHERE FALSE;

SELECT 
  id, 
  expense_id, 
  name, 
  total 
FROM expense_items 
WHERE FALSE;

ROLLBACK;
