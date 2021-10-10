import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

import config from './config.js'
import router from './src/router.js'

const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan('combined'))
app.use('/api/v1', router)

app.listen(config.port, () => {
  console.log(`Server listening on http://localhost:${config.port}`)
})
