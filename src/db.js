import { createPool } from 'slonik'
import { createQueryLoggingInterceptor } from 'slonik-interceptor-query-logging'
import config from '../config.js'

const interceptors = [createQueryLoggingInterceptor()]

const pool = createPool(config.pg.conn, { interceptors })

export default pool
