import { sql } from 'slonik'
import pool from '../db.js'

export const fetchForRange = async (from, to) => {
  const data = await pool.any(sql`
    SELECT 
      expenses.id,
      expenses.category_id,
      categories.name AS category_name,
      expenses.name,
      expenses.date,
      expenses.currency,
      expenses.rate,
      expenses.total,
      expenses.recurring
    FROM expenses
    INNER JOIN categories ON expenses.category_id = categories.id
    WHERE expenses.date BETWEEN ${from} AND ${to}
    ORDER BY expenses.date ASC
  `)

  return data.map(({ category_id, category_name, ...expense }) => ({
    ...expense,
    category: {
      id: category_id,
      name: category_name,
    },
  }))
}

export const insertExpense = async ({
  name,
  date,
  currency,
  rate,
  total,
  category_id,
}) => {
  const expense = await pool.one(sql`
    INSERT INTO expenses (
      name,
      date,
      currency,
      rate,
      total,
      category_id
    ) VALUES (
      ${name},
      ${date},
      ${currency},
      ${rate},
      ${total},
      ${category_id}
    )
    RETURNING 
      id, 
      name, 
      date, 
      currency,
      rate, 
      total, 
      recurring
  `)

  const category = await pool.one(sql`
    SELECT id, name FROM categories WHERE id = ${category_id} 
  `)

  return {
    ...expense,
    category,
  }
}
