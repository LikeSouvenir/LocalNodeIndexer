import {Pool}from 'pg'
import dotenv from 'dotenv'
dotenv.config()

const DEFAULT_PORT = 5432 as const

const pool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT ? parseInt(process.env.PGPORT) : DEFAULT_PORT,
  database: process.env.PGDATABASE
})

export {pool}
