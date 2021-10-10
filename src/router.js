import express from 'express'

import {
  createExpense,
  getExpensesForRange,
} from './controllers/expensesController.js'

import {
  getCategories,
  createCategory,
} from './controllers/categoriesController.js'

const router = express.Router()

router.get('/', (_, res) => res.json({ status: 'healthy' }))

router.get('/expenses', getExpensesForRange)
router.post('/expenses', createExpense)

router.get('/categories', getCategories)
router.post('/categories', createCategory)

export default router
