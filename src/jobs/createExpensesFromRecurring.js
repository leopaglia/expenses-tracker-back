import { format, isFirstDayOfMonth, isMonday, getDayOfYear } from 'date-fns'
import * as expensesRepository from '../repositories/expensesRepository.js'
import * as fixer from '../services/fixer.js'

const now = new Date()

const yearlyExpenses =
  getDayOfYear(now) === 1
    ? await expensesRepository.fetchRecurringByFrequency('yearly')
    : []

const monthlyExpenses = isFirstDayOfMonth(now)
  ? await expensesRepository.fetchRecurringByFrequency('monthly')
  : []

const weeklyExpenses = isMonday(now)
  ? await expensesRepository.fetchRecurringByFrequency('weekly')
  : []

const recurringExpenses = [
  ...yearlyExpenses,
  ...monthlyExpenses,
  ...weeklyExpenses,
]

const promises = recurringExpenses.map(async (recurringExpense) => {
  const isIncomplete = !recurringExpense.total
  const rate = await fixer.getRate(recurringExpense.currency)

  if (isIncomplete) {
    console.log(`Creating incomplete expense from ID: ${recurringExpense.id}`)
    return expensesRepository.insertIncomplete({
      name: recurringExpense.name,
      currency: recurringExpense.currency,
      category_id: recurringExpense.category.id,
      date: format(now, 'yyyy-MM-dd'),
    })
  }

  console.log(`Creating expense from ID: ${recurringExpense.id}`)
  return expensesRepository.insertExpense({
    name: recurringExpense.name,
    currency: recurringExpense.currency,
    category_id: recurringExpense.category.id,
    total: recurringExpense.total,
    date: format(now, 'yyyy-MM-dd'),
    rate,
  })
})

await Promise.all(promises)
