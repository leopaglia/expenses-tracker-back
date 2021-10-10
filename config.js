export default {
  port: process.env.PORT,
  pg: { conn: process.env.DATABASE_URL },
}
