import express from 'express'

import {
  createExpense,
  createRecurringExpense,
  getRecurringExpenses,
  getExpensesForRange,
  getIncompleteExpenses,
  completeExpense,
} from './controllers/expensesController.js'

import {
  getCategories,
  createCategory,
} from './controllers/categoriesController.js'

const router = express.Router()

router.get('/', (_, res) => res.json({ status: 'healthy' }))

router.get('/expenses', getExpensesForRange)
router.post('/expenses', createExpense)

router.get('/expenses/recurring', getRecurringExpenses)
router.post('/expenses/recurring', createRecurringExpense)

router.get('/expenses/incomplete', getIncompleteExpenses)
router.put('/expenses/incomplete/:expenseID', completeExpense)

router.get('/categories', getCategories)
router.post('/categories', createCategory)

export default router
