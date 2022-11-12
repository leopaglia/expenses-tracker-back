import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import cron from 'node-cron'

import config from './config.js'
import router from './src/router.js'

import createExpensesFromRecurring from './src/jobs/createExpensesFromRecurring.js'

const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan('combined'))
app.use('/api/v1', router)

app.listen(config.port, () => {
  console.log(`Server listening on http://localhost:${config.port}`)
})

cron.schedule('0 0 * * *', () => {
  console.log('running scheduled job: createExpensesFromRecurring')
  createExpensesFromRecurring()
})
