import { isMatch } from 'date-fns'
import { controller } from '../utils/controllers.js'
import * as expensesRepository from '../repositories/expensesRepository.js'
import * as categoriesRepository from '../repositories/categoriesRepository.js'
import * as fixer from '../services/fixer.js'

const dateFormat = 'yyyy-MM-dd'

export const getExpensesForRange = controller(
  { required: ['from', 'to'] },
  async (req, res) => {
    const { from, to } = req.query

    if (!isMatch(from, dateFormat) || !isMatch(to, dateFormat)) {
      return res.status(400).json({
        error: `'from' and 'to' parameters have to be valid dates (${dateFormat}).`,
      })
    }

    const expenses = await expensesRepository.fetchForRange(from, to)

    return res.status(200).json(expenses)
  }
)

export const createExpense = controller(
  { required: ['date', 'category_id', 'currency', 'total', 'name'] },
  async (req, res) => {
    const { date, category_id, currency, total, name } = req.body

    const categoryExists = await categoriesRepository.existsByID(category_id)

    if (!categoryExists) {
      return res.status(400).json({
        error: "'category' parameter has to be an existing category id.",
      })
    }

    if (!isMatch(date, dateFormat)) {
      return res.status(400).json({
        error: `'date' parameter has to be a valid date (${dateFormat}).`,
      })
    }

    if (total <= 0) {
      return res.status(400).json({
        error: "'total' parameter has to be positive.",
      })
    }

    const rate = await fixer.getRate(currency)

    const expense = await expensesRepository.insertExpense({
      date,
      category_id,
      currency,
      total,
      name,
      rate,
    })

    return res.status(201).json(expense)
  }
)

export const getRecurringExpenses = controller({}, async (_, res) => {
  const recurringExpenses = await expensesRepository.fetchRecurring()

  return res.status(200).json(recurringExpenses)
})

export const createRecurringExpense = controller(
  { required: ['frequency', 'category_id', 'currency', 'name'] }, 
  async (req, res) => {
    const { frequency, category_id, currency, name, total } = req.body

    const categoryExists = await categoriesRepository.existsByID(category_id)

    if (!categoryExists) {
      return res.status(400).json({
        error: "'category' parameter has to be an existing category id.",
      })
    }

    const recurringExpense = await expensesRepository.insertRecurringExpense({
      frequency,
      category_id,
      currency,
      total,
      name,
    })

    return res.status(201).json(recurringExpense)
  }
)

export const getIncompleteExpenses = controller({}, async (_, res) => {
  const incompleteExpenses = await expensesRepository.fetchIncomplete()

  return res.status(200).json(incompleteExpenses)
})

export const completeExpense = controller(
  { required: ['total'] }, 
  async (req, res) => {
    const { expenseID } = req.params
    const { total } = req.body

    const incompleteExpenseExists = await expensesRepository.incompleteExistsByID(expenseID)

    if (!incompleteExpenseExists) {
      return res.status(400).json({
        error: "route parameter has to be an existing incomplete expoense id.",
      })
    }

    const incompleteExpense = await expensesRepository.fetchIncompleteByID(expenseID)
    
    // this loads rate from the day the expense it's being completed, not the day that the payment is fulfilled
    const rate = await fixer.getRate(incompleteExpense.currency)

    // the following 2 actions should be moved into repository and re-coded as a transaction

    const newExpense = await expensesRepository.insertExpense({ 
      name: incompleteExpense.name,
      date: incompleteExpense.date,
      currency: incompleteExpense.currency,
      category_id: incompleteExpense.category_id,
      rate,
      total
    })

    await expensesRepository.deleteIncompleteByID(expenseID)

    return res.status(201).json(newExpense)
  }
)
