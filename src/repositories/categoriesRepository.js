import { sql } from 'slonik'
import pool from '../db.js'

export const existsByID = async (id) => {
  const exists = await pool.exists(sql`
    SELECT 1 FROM categories WHERE id = ${id}
  `)

  return exists
}

export const existsByName = async (name) => {
  const exists = await pool.exists(sql`
    SELECT 1 FROM categories WHERE name = ${name}
  `)

  return exists
}

export const fetchCategories = async () => {
  const categories = await pool.any(sql`
    SELECT id, name FROM categories
  `)

  return categories
}

export const insertCategory = async (name) => {
  const category = await pool.one(sql`
    INSERT INTO categories (name) 
    VALUES (${name})
    RETURNING id, name
  `)

  return category
}
